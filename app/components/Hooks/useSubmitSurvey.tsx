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
  const { courtId, questions, ...ctx } = useAnswerContext();
  const answers = (ctx as any).answers as { [key: string]: string };
  const { handleNext, error } = useValidate();

  const idMap: Record<number, number> = {
    16: 17,
    17: 18,
    18: 19,
    19: 20,
    20: 21,
    21: 22, 
  };

  const getResponses = (): QuestionResponse[] => {
    return questions.map((question) => {
      const selected = answers[question.id.toString()];
      const custom = answers[`${question.id}_custom`];
      const text = answers[`${question.id}_text`];

      let qid = question.id;
      if (idMap[question.id]) {
        qid = idMap[question.id];
      }

      if ([6, 13, 20].includes(question.id)) {
        return {
          question: qid,
          custom_answer: text || "",
        };
      }

      if (selected) {
        return {
          question: qid,
          selected_option: Number(selected),
          ...(custom && { custom_answer: custom }),
        };
      }

      if ([9, 10, 11, 12, 13].includes(question.id)) {
        return {
          question: qid,
          custom_answer: "Нет ответа",
        };
      }

      if (question.is_required) {
        return {
          question: qid,
          custom_answer: "",
        };
      }

      return null;
    }).filter(Boolean) as QuestionResponse[];
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

    setLoading(true);
    setError(null);
    setSubmitSuccess(null);

    try {
      const responses = getResponses();

      updateFingerprintStatus("completed");

      if (!courtId) {
        setError("Не указан ID суда.");
        console.error("courtId is missing");
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
        console.error("403 error", await response.text());
        return;
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error("Ошибка отправки данных:", errText);
        throw new Error("Ошибка отправки данных.");
      }

      setSubmitSuccess("Опрос успешно отправлен!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка.");
      console.error("handleSubmit error", err);
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
