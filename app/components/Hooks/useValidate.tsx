"use client";

import { useEffect, useState } from "react";
import { useQuestionStorage } from "./useQuestionStorage";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const useValidate = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname

// Шаги: инициализация из localStorage
const [step, setStep] = useState<number>(0);
const [error, setError] = useState<boolean>(false);

useEffect(() => {
  // Считываем шаг из localStorage при инициализации
  const savedStep = localStorage.getItem("currentStep");
  if (savedStep) {
    setStep(Number(savedStep));
  }
  
  // Проверяем текущий маршрут и сбрасываем шаг на 0 для BlankOne
  if (pathname === "/pages/BlankOne") {
    setStep(0);
    localStorage.setItem("currentStep", "0");
  }
}, [pathname]); // Отслеживаем изменение маршрута

const updateStep = (newStep: number) => {
  setStep(newStep);
  localStorage.setItem("currentStep", newStep.toString());
};

// Подключаем валидацию для вопросов
const { validateStep: validateQuestion1 } = useQuestionStorage({
  localStorageKey: "Question_1",
});
const { validateStep: validateQuestion2 } = useQuestionStorage({
  localStorageKey: "Question_2",
});
const { validateStep: validateQuestion3 } = useQuestionStorage({
  localStorageKey: "Question_3",
});
const { validateStep: validateQuestion4 } = useQuestionStorage({
  localStorageKey: "Question_4",
});
const { validateStep: validateQuestion5 } = useQuestionStorage({
  localStorageKey: "Question_5",
});
const { validateStep: validateQuestion6 } = useQuestionStorage({
  localStorageKey: "Question_6",
});
const { validateStep: validateQuestion6_1 } = useQuestionStorage({
  localStorageKey: "Question_6_1",
});
const { validateStep: validateQuestion7 } = useQuestionStorage({
  localStorageKey: "Question_7",
});
const { validateStep: validateQuestion8 } = useQuestionStorage({
  localStorageKey: "Question_8",
});
const { validateStep: validateQuestion9 } = useQuestionStorage({
  localStorageKey: "Question_9",
});
const { validateStep: validateQuestion10 } = useQuestionStorage({
  localStorageKey: "Question_10",
});
const { validateStep: validateQuestion11 } = useQuestionStorage({
  localStorageKey: "Question_11",
});
const { validateStep: validateQuestion12 } = useQuestionStorage({
  localStorageKey: "Question_12",
});
const { validateStep: validateQuestion13 } = useQuestionStorage({
  localStorageKey: "Question_13",
});
const { validateStep: validateQuestion14 } = useQuestionStorage({
  localStorageKey: "Question_14",
});
const { validateStep: validateQuestion15 } = useQuestionStorage({
  localStorageKey: "Question_15",
});

const handleNext = () => {
  if (step === 0) {
    // Проверяем вопросы 1-8 для step === 0
    if (
      validateQuestion1() &&
      validateQuestion2() &&
      validateQuestion3() &&
      validateQuestion4() &&
      validateQuestion5() &&
      validateQuestion6() &&
      validateQuestion6_1() &&
      validateQuestion7() &&
      validateQuestion8()
    ) {
      setError(false);
      updateStep(1); // Переход на step === 1
      router.push("/pages/BlankTwo");
    } else {
      setError(true); // Показываем сообщение об ошибке
    }
  } else if (step === 1) {
    // Проверяем вопросы 9-14 для step === 1
    if (
      validateQuestion9() &&
      validateQuestion10() &&
      validateQuestion11() &&
      validateQuestion12() &&
      validateQuestion13() &&
      validateQuestion14()
    ) {
      setError(false);
      updateStep(2); // Переход на step === 2
      router.push("/pages/BlankThree");
    } else {
      setError(true); // Показываем сообщение об ошибке
    }
  } else if (step === 2) {
    if (validateQuestion15()) {
      setError(false);
      updateStep(3);
    } else {
      setError(true);
    }
  } else {
    setError(true); // Если ни одно условие не выполняется
  }
};

// Функция для перехода на предыдущий шаг
const handleBack = () => {
  setError(false); // Сбрасываем ошибку
  if (step === 1) {
    updateStep(0);
    router.push("/pages/BlankOne");
  } else if (step === 2) {
    updateStep(1);
    router.push("/pages/BlankTwo");
  } else if (step === 3) {
    updateStep(2);
    router.push("/pages/BlankThree");
  }
};

const handleClearForm = () => {
  localStorage.clear();
  updateStep(0);
  window.location.reload();
};
  return {
    step,
    error,
    handleNext,
    handleBack,
    handleClearForm,
};
};
