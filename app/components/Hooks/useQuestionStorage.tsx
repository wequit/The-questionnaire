'use client'
import { useState, useEffect } from "react";
import { useAnswerContext } from "@/lib/utils/AnswerContext";

interface UseQuestionStorageProps {
  localStorageKey: string;
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const { getAnswer, setAnswer } = useAnswerContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(getAnswer(localStorageKey));
  }, [getAnswer, localStorageKey]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setAnswer(localStorageKey, option);
    updateAnsweredStatus(true, localStorageKey);
  };

  const updateAnsweredStatus = (isAnswered: boolean, questionId: string) => {
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
      questionElement.setAttribute("data-question-answered", isAnswered ? "true" : "false");
    }
  };

  const validateStep = () => {
    const currentOption = getAnswer(localStorageKey);
    return currentOption !== null;
  };

  return {
    selectedOption,
    handleOptionChange,
    validateStep
  };
};
