"use client";

import { useState, useEffect } from "react";

interface UseQuestionStorageProps {
  localStorageKey: string;
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const storedOption = localStorage.getItem(localStorageKey);
    if (storedOption) {
      setSelectedOption(storedOption);
    }
    console.log(`Loaded option for ${localStorageKey}:`, storedOption);
  }, [localStorageKey]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem(localStorageKey, option);
    console.log(`Option changed for ${localStorageKey}:`, option);
  };

  const validateStep = () => {
    const isValid = selectedOption !== null;
    console.log(`Validation for ${localStorageKey}:`, isValid);
    return isValid;
  };

  return {
    selectedOption,
    handleOptionChange,
    validateStep,
  };
};
