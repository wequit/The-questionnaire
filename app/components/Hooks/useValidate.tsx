import { useState } from "react";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  const questionNumbers = Array.from({ length: 23 }, (_, i) => i + 1);

  // Массив валидаторов, которые проверяют наличие ответа для каждого вопроса
  const validators = questionNumbers.map((questionId) => {
    // Возвращаем функцию для проверки, был ли выбран ответ (смотрим на атрибут data-question-answered)
    return () => {
      const questionElement = document.getElementById(`question-${questionId}`);
      return questionElement?.getAttribute("data-question-answered") === "true";
    };
  });

  const handleNext = () => {
    console.time("handleNext"); // Замеряем время на валидацию
  
    const results = validators.map((validate) => validate());
    const allValid = results.every((isValid) => isValid); // Все ли ответы правильные (true)?
  
    setError(!allValid); // Если есть ошибочные, то выставляем error в true
  
    console.timeEnd("handleNext"); // Заканчиваем замер времени
  
    return allValid;
  };
  

  // Функция для обновления атрибута data-question-answered
  const updateAnsweredStatus = (questionId: number, isAnswered: boolean) => {
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
      questionElement.setAttribute(
        "data-question-answered",
        isAnswered ? "true" : "false"
      );
    }
  };

  return {
    error,
    handleNext,
    updateAnsweredStatus, // Возвращаем функцию для обновления статуса
  };
};
