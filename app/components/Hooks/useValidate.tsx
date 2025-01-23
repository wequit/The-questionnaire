'use client'
import { useState } from "react";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  // Массив номеров существующих вопросов (исключаем 3-й вопрос)
  const questionNumbers = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const validators = questionNumbers.map((questionId) => {
    return () => {
      const questionElement = document.getElementById(`question-${questionId}`);
      const isAnswered = questionElement?.getAttribute("data-question-answered") === "true";
      
      console.log(`Вопрос ${questionId}:`, {
        element: questionElement,
        'data-question-answered': questionElement?.getAttribute("data-question-answered"),
        isAnswered: isAnswered
      });
      
      return isAnswered;
    };
  });

  const handleNext = () => {
    console.log("Начало валидации...");
    
    const results = validators.map((validate, index) => {
      const isValid = validate();
      console.log(`Результат валидации вопроса ${questionNumbers[index]}:`, isValid);
      return isValid;
    });
    
    const allValid = results.every((isValid) => isValid);
    console.log("Все вопросы валидны:", allValid);
    
    setError(!allValid);
    return allValid;
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
