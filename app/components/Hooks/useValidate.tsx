import { useState, useEffect } from "react";
import { useQuestionStorage } from "./useQuestionStorage";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  const { validateStep: validateQuestion1 } = useQuestionStorage({
    localStorageKey: "1",
  });
  const { validateStep: validateQuestion2 } = useQuestionStorage({
    localStorageKey: "2",
  });
  const { validateStep: validateQuestion3 } = useQuestionStorage({
    localStorageKey: "3",
  });
  const { validateStep: validateQuestion4 } = useQuestionStorage({
    localStorageKey: "4",
  });
  const { validateStep: validateQuestion5 } = useQuestionStorage({
    localStorageKey: "5",
  });

  const handleNext = () => {
    const isValid1 = validateQuestion1();
    const isValid2 = validateQuestion2();
    const isValid3 = validateQuestion3();
    const isValid4 = validateQuestion4();
    const isValid5 = validateQuestion5();

    const allValid = isValid1 && isValid2 && isValid3 && isValid4 && isValid5;
    setError(!allValid);

    console.log("Validation results:", {
      question1: isValid1,
      question2: isValid2,
      question3: isValid3,
      question4: isValid4,
      question5: isValid5,
      allValid,
    });

    return allValid; 
  };

  return {
    error,
    handleNext,
  };
};