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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Массив выбранных опций
  const [otherText, setOtherText] = useState<string>(""); // Текст "Другое"

  // Загружаем данные из localStorage при монтировании компонента
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

  // Обработка выбора опций
  const handleOptionChange = (option: string) => {
    let updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }

    // Обновляем состояние выбранных опций и сохраняем в localStorage
    setSelectedOptions(updatedOptions);
    localStorage.setItem(localStorageKey, updatedOptions.join(","));

    // Если выбрано "Другое", очищаем текстовое поле
    if (option === "Другое:") {
      setOtherText(""); // Очищаем поле для текста "Другое"
    }
  };

  // Обработка ввода текста для "Другое"
  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);

    // Сохраняем текст "Другое" в localStorage
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
