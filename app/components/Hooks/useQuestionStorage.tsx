"use client";
import { useEffect, useState } from "react";

interface UseQuestionStorageProps {
  localStorageKey: string;
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem(localStorageKey, option); // Сохраняем выбранное значение в localStorage
    setIsSubmitted(false); // Убираем сообщение об ошибке
  };

  const validateStep = () => {
    const storedOption = localStorage.getItem(localStorageKey); // Проверяем, выбран ли ответ
    if (!storedOption) {
      setIsSubmitted(true); // Устанавливаем ошибку
      return false;
    }
    setIsSubmitted(false); // Убираем ошибку
    return true;
  };
  
  // 2-3 вопрос
  const [selectedGender, setSelectedGender] = useState<string | null>(() => {
    return localStorage.getItem("Question_2") || null;
  });
  const [selectedAge, setSelectedAge] = useState<string | null>(() => {
    return localStorage.getItem("Question_3") || null;
  });

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    localStorage.setItem("Question_2", gender);
    if (selectedAge) {
      setIsSubmitted(false);
    }
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(age);
    localStorage.setItem("Question_3", age);
    if (selectedGender) {
      setIsSubmitted(false);
    }
  };

  // 7 вопрос
  const [otherText, setOtherText] = useState<string>("");

  useEffect(() => {
    // Загружаем данные из localStorage, если они есть
    const savedOption = localStorage.getItem("Question_7");
    const savedOtherText = localStorage.getItem("Question_7_other");

    if (savedOption) {
      setSelectedOption(savedOption); // Восстанавливаем выбранный вариант
    }
    if (savedOtherText) {
      setOtherText(savedOtherText); // Восстанавливаем текст "Другое"
    }
  }, []);

  const handleOptionChange_7 = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_7", option); // Сохраняем выбранную опцию в localStorage

    // Если выбрано "Другое", сохраняем и текст
    if (option !== "Другое") {
      localStorage.removeItem("Question_7_other");
      setOtherText("");
    }

    setIsSubmitted(false); // Сбрасываем флаг ошибки
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);

    // Сохраняем текст для "Другое" в localStorage
    if (selectedOption === "Другое") {
      localStorage.setItem("Question_7_other", value);
    }
  };

  // 6.1 вопрос
  const [selectedOption_6_1, setSelectedOption_6_1] = useState<string[]>(() => {
    const savedOptions = localStorage.getItem("Question_6_1");
    return savedOptions ? savedOptions.split(",") : [];
  });

  useEffect(() => {
    // Сохраняем данные в localStorage при каждом изменении selectedOptions
    localStorage.setItem("Question_6_1", selectedOption_6_1.join(","));
  }, [selectedOption_6_1]);

  const handleOptionChange_6_1 = (option: string) => {
    setSelectedOption_6_1((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option); // Убираем опцию, если она уже выбрана
      } else {
        return [...prev, option]; // Добавляем опцию, если она не выбрана
      }
    });
    setIsSubmitted(false); // Сбрасываем ошибку, если она есть
  };
  return {
    selectedOption,
    isSubmitted,
    handleOptionChange,
    validateStep,
    otherText,
    handleGenderChange,
    handleAgeChange,
    selectedGender,
    selectedAge,
    handleOptionChange_7,
    handleOtherTextChange,
    handleOptionChange_6_1,
    selectedOption_6_1,
  };
};