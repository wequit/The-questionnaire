'use client'
import { useState } from "react";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  const questionNumbers = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const handleNext = async () => {
    console.log("Начало валидации...");
    let isValid = true;

    for (const questionId of questionNumbers) {
      if (questionId === 13) continue;

      const element = document.getElementById(`question-${questionId}`);
      const isAnswered = element?.getAttribute("data-question-answered") === "true";

      console.log(`Вопрос ${questionId}:`, {
        element,
        "data-question-answered": element?.getAttribute("data-question-answered"),
        isAnswered,
      });

      if (!isAnswered) {
        isValid = false;
      }

      console.log(`Результат валидации вопроса ${questionId}:`, isAnswered);
    }

    console.log("Все вопросы валидны:", isValid);
    setError(!isValid);
    return isValid;
  };

  const updateAnsweredStatus = (questionId: number, isAnswered: boolean) => {
    console.log(`Обновление статуса ответа для вопроса ${questionId}:`, isAnswered);
  };

  return {
    error,
    handleNext,
    updateAnsweredStatus,
  };
};
