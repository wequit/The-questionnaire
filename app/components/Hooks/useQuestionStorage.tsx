"use client";
import { useEffect, useState } from "react";

interface UseQuestionStorageProps {
  localStorageKey: string; 
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [otherText, setOtherText] = useState<string>(""); 

  useEffect(() => {
    
    const savedOption = localStorage.getItem(localStorageKey);
    const savedOtherText = localStorage.getItem(`${localStorageKey}_other`); 
    
    if (savedOption) {
      setSelectedOption(savedOption); 
    }
    if (savedOtherText) {
      setOtherText(savedOtherText); 
    }
  }, [localStorageKey]); 

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); 
    localStorage.setItem(localStorageKey, option); 

    if (option !== "Другое:") {
      localStorage.removeItem(`${localStorageKey}_other`);
      setOtherText(""); 
    }

    setIsSubmitted(false); 
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);
  
    if (selectedOption === "Другое:") {
      localStorage.setItem(`${localStorageKey}_other`, value); 
    }
      localStorage.setItem(`${localStorageKey}_other`, value)
  };  

  const validateStep = () => {
    const storedOption = localStorage.getItem(localStorageKey);
    if (!storedOption) {
      setIsSubmitted(true); 
      return false;
    }
    setIsSubmitted(false); 
    return true;
  };

  return {
    selectedOption,
    otherText,
    isSubmitted,
    handleOptionChange,
    handleOtherTextChange,
    validateStep,
  };
};
