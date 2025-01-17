'use client'
import { useState } from "react";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  const questionNumbers = Array.from({ length: 23 }, (_, i) => i + 1);

  const validators = questionNumbers.map((questionId) => {
    return () => {
      const questionElement = document.getElementById(`question-${questionId}`);
      return questionElement?.getAttribute("data-question-answered") === "true";
    };
  });

  const handleNext = () => {
  
    const results = validators.map((validate) => validate());
    const allValid = results.every((isValid) => isValid); 
  
    setError(!allValid); 
  
    return allValid;
  };
  

  const updateAnsweredStatus = (questionId: number, isAnswered: boolean) => {
    
  };
  

  return {
    error,
    handleNext,
    updateAnsweredStatus,
  };
};
