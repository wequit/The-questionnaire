"use client";
import { useEffect, useState } from "react";

interface UseQuestionStorageProps {
  localStorageKey: string; // Ключ для хранения в localStorage
}

export const useQuestionStorage = ({ localStorageKey }: UseQuestionStorageProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Состояние выбранной опции
  const [isSubmitted, setIsSubmitted] = useState(false); // Состояние для отслеживания ошибок
  const [otherText, setOtherText] = useState<string>(""); // Состояние для текста "Другое"

  useEffect(() => {
    // Загружаем данные из localStorage, если они есть
    const savedOption = localStorage.getItem(localStorageKey);
    const savedOtherText = localStorage.getItem(`${localStorageKey}_other`); // Уникальный ключ для "Другое"
    
    if (savedOption) {
      setSelectedOption(savedOption); // Восстанавливаем выбранную опцию
    }
    if (savedOtherText) {
      setOtherText(savedOtherText); // Восстанавливаем текст "Другое"
    }
  }, [localStorageKey]); // Хук срабатывает при изменении ключа

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); // Устанавливаем выбранную опцию
    localStorage.setItem(localStorageKey, option); // Сохраняем выбранное значение в localStorage

    // Если выбрано не "Другое", удаляем текст
    if (option !== "Другое:") {
      localStorage.removeItem(`${localStorageKey}_other`);
      setOtherText(""); // Очищаем текст
    }

    setIsSubmitted(false); // Сбрасываем ошибку
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);

    // Сохраняем текст для "Другое" в localStorage
    if (selectedOption === "Другое:") {
      localStorage.setItem(`${localStorageKey}_other`, value); // Сохраняем текст в локальном хранилище
    }
  };

  const validateStep = () => {
    const storedOption = localStorage.getItem(localStorageKey);
    if (!storedOption) {
      setIsSubmitted(true); // Устанавливаем ошибку, если ответ не выбран
      return false;
    }
    setIsSubmitted(false); // Убираем ошибку
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
