import { useState } from "react";
import {
  getOrCreateFingerprint,
  updateFingerprintStatus,
} from "@/lib/utils/fingerprint";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useValidate } from "./useValidate";

interface QuestionResponse {
  question: number;
  selected_option?: number | null;
  custom_answer?: string;
  multiple_selected_options?: string[] | null;
}

export const useSubmitSurvey = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const { courtId, questions } = useAnswerContext();
  const { handleNext, error } = useValidate();

  const getAnswersFromLocalStorage = (): QuestionResponse[] => {
    const responses: QuestionResponse[] = [];
  
    questions.forEach((question) => {
      const questionId = question.id;
      const storedOption = localStorage.getItem(questionId.toString());
      const customAnswer = localStorage.getItem(`${questionId}_custom`);
  
      console.log(`Проверка для вопроса ${questionId}:`);
      console.log(`storedOption: ${storedOption}, customAnswer: ${customAnswer}`);
  
      const hasOtherOption = question.options.some(
        (option) => option.text_ru === "Другое:" || option.text_kg === "Другое:"
      );
  
      if (questionId === 16) {
        if (storedOption) {
          responses.push({
            question: questionId,
            multiple_selected_options: storedOption
              .split(",")
              .map((item) => item.trim().toString()), 
          });
        } else {
          responses.push({
            question: questionId,
            multiple_selected_options: null, 
          });
        }
      } else if (questionId === 23) {
        responses.push({
          question: questionId,
          custom_answer:
            customAnswer && customAnswer.trim() ? customAnswer : "",
        });
      } else if (questionId === 13) {
        if (storedOption) {
          const selectedOption = parseInt(storedOption, 10);
  
          responses.push({
            question: questionId,
            selected_option: selectedOption,
          });
        } else {
          responses.push({
            question: questionId,
            custom_answer: "Необязательный вопрос",
          });
        }
      } else if (storedOption || customAnswer) {
        const selectedOption =
          storedOption === "custom"
            ? null
            : storedOption
            ? parseInt(storedOption, 10)
            : null;
  
        responses.push({
          question: questionId,
          selected_option: selectedOption,
          custom_answer:
            hasOtherOption && customAnswer ? customAnswer : undefined,
        });
  
        console.log(
          `Добавлен ответ для вопроса ${questionId}:`,
          responses[responses.length - 1]
        );
      } else {
        if (questionId === 1) {
          const selectedOption = storedOption
            ? parseInt(storedOption, 10)
            : undefined;
  
          responses.push({
            question: questionId,
            ...(selectedOption !== undefined
              ? { selected_option: selectedOption }
              : { custom_answer: "Необязательный вопрос" }), 
          });
  
          console.log(
            `Ответ для первого вопроса ${questionId}:`,
            responses[responses.length - 1]
          );
        }
  
        if (!question.is_required && questionId !== 1) {
          const selectedOption = storedOption
            ? parseInt(storedOption, 10)
            : undefined;
  
          responses.push({
            question: questionId,
            ...(selectedOption !== undefined && {
              selected_option: selectedOption,
            }),
            custom_answer: customAnswer
              ? customAnswer
              : "Необязательный вопрос",
          });
  
          console.log(
            `Ответ для необязательного вопроса ${questionId}:`,
            responses[responses.length - 1]
          );
        }
      }
    });
  
    responses.sort((a, b) => a.question - b.question);
  
    console.log("Окончательные ответы:", responses);
    return responses;
  };
  
  

  const scrollToFirstUnansweredQuestion = () => {
    const unansweredElements = document.querySelectorAll(
      '[data-question-answered="false"]'
    );

    if (unansweredElements.length > 0) {
      const firstUnansweredElement = unansweredElements[0];
      const elementTop =
        firstUnansweredElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementTop - 200, 
        behavior: "smooth", 
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
        "https://opros.sot.kg/api/v1/surveys/1/responses/",
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

  return {
    handleSubmit,
    loading,
    errorMessage,
    submitSuccess,
    scrollToFirstUnansweredQuestion,
    isSubmitting,
  };
};
