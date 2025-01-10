import { useState, useEffect } from "react";

interface UseQuestionStorageProps {
  localStorageKey: string;
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherText, setOtherText] = useState<string>("");

  useEffect(() => {
    const storedOption = localStorage.getItem(localStorageKey);
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, [localStorageKey]);
  

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem(localStorageKey, option);
    updateAnsweredStatus(true, localStorageKey);
  };

  const updateAnsweredStatus = (isAnswered: boolean, questionId: string) => {
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
      questionElement.setAttribute("data-question-answered", isAnswered ? "true" : "false");
    }
  };

  const validateStep = () => {
    const currentOption = localStorage.getItem(localStorageKey);
    return currentOption !== null;
  };

  return {
    selectedOption,
    handleOptionChange,
    validateStep
  };
};
