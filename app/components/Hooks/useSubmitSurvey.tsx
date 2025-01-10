import { useState } from "react";
import {  getOrCreateFingerprint,  updateFingerprintStatus} from "@/lib/utils/fingerprint";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useValidate } from "./useValidate";

interface QuestionResponse {
  question: number;
  selected_option: number | null;
  custom_answer?: string;
}
export const useSubmitSurvey = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { courtId } = useAnswerContext();
  const { handleNext, error } = useValidate();

  const getAnswersFromLocalStorage = (): QuestionResponse[] => {
    const responses: QuestionResponse[] = [];
  
    Object.keys(localStorage).forEach((key) => {
      if (!isNaN(Number(key))) {
        const questionId = parseInt(key, 10);
        const storedOption = localStorage.getItem(key);
  
        const customAnswer = localStorage.getItem(`${questionId}_custom`) || "";
  
        if (storedOption || customAnswer) {
          responses.push({
            question: questionId,
            selected_option: customAnswer ? null : storedOption ? parseInt(storedOption, 10) : null,
            custom_answer: customAnswer || undefined,
          });
        }
      }
    });
  
    responses.sort((a, b) => a.question - b.question);
  
    return responses;
  };
  

  const scrollToFirstUnansweredQuestion = () => {
    const unansweredElements = document.querySelectorAll(
      '[data-question-answered="false"]'
    );
  
    if (unansweredElements.length > 0) {
      const firstUnansweredElement = unansweredElements[0];
      const elementTop = firstUnansweredElement.getBoundingClientRect().top + window.scrollY;
  
      window.scrollTo({
        top: elementTop - 200, // Можно вычесть значение, чтобы добавить отступ сверху
        behavior: "smooth", // Плавное прокручивание
      });
    }
  };
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    handleNext();
    if (error) {
      setError("Пожалуйста, ответьте на все обязательные вопросы.");
      return;
    }

    setLoading(true);
    setError(null);
    setSubmitSuccess(null);

    try {
      const responses = getAnswersFromLocalStorage();

      updateFingerprintStatus("completed");

      if (!courtId) {
        setError("Не указан ID суда.");
        return;
      }

      const fingerprint = getOrCreateFingerprint();

      const payload = {
        fingerprint: {
          id: fingerprint.id,
          status: fingerprint.status,
          createdAt: fingerprint.createdAt,
        },
        court: courtId,
        question_responses: responses,
      };

      const response = await fetch(
        "https://opros.pythonanywhere.com/api/v1/surveys/1/responses/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 403) {
        setError("Вы уже прошли этот опрос. Спасибо за ваше участие!");
        return;
      }

      if (!response.ok) {
        throw new Error("Ошибка отправки данных.");
      }

      setSubmitSuccess("Опрос успешно отправлен!");
    } catch (err) {
      console.error("Ошибка:", err);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, errorMessage, submitSuccess, scrollToFirstUnansweredQuestion , isSubmitting};
};

