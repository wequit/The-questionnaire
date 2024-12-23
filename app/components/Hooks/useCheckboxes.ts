"use client"
import { useEffect, useState } from "react";

interface UseQuestionCheckboxesProps {
  localStorageKey: string;
  localStorageOtherKey: string;
}

export const useQuestionCheckboxes = ({
  localStorageKey,
  localStorageOtherKey,
}: UseQuestionCheckboxesProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); 
  const [otherText, setOtherText] = useState<string>(""); 

  useEffect(() => {
    const savedOptions = localStorage.getItem(localStorageKey);
    if (savedOptions) {
      setSelectedOptions(savedOptions.split(","));
    }

    const savedOtherText = localStorage.getItem(localStorageOtherKey);
    if (savedOtherText) {
      setOtherText(savedOtherText);
    }
  }, [localStorageKey, localStorageOtherKey]);

  const handleOptionChange = (option: string) => {
    let updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);
    localStorage.setItem(localStorageKey, updatedOptions.join(","));

    if (option === "Другое:") {
      setOtherText(""); 
    }
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);

    if (selectedOptions.includes("Другое:")) {
      localStorage.setItem(localStorageOtherKey, value);
    }
  };

  return {
    selectedOptions,
    otherText,
    handleOptionChange,
    handleOtherTextChange,
  };
};
