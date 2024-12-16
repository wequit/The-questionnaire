"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

const FooterActions = () => {
  const [step, setStep] = useState(0);

  // Подключаем валидацию для 1-го и 4-го вопросов
  const { validateStep: validateQuestion1, isSubmitted: isSubmitted1 } = useQuestionStorage({
    localStorageKey: "Question_1",
  });
  const { validateStep: validateQuestion2, isSubmitted: isSubmitted2 } = useQuestionStorage({
    localStorageKey: "Question_2",
  });
  const { validateStep: validateQuestion3, isSubmitted: isSubmitted3 } = useQuestionStorage({
    localStorageKey: "Question_3",
  });
  const { validateStep: validateQuestion4, isSubmitted: isSubmitted4 } = useQuestionStorage({
    localStorageKey: "Question_4",
  });
  const { validateStep: validateQuestion5, isSubmitted: isSubmitted5 } = useQuestionStorage({
    localStorageKey: "Question_5",
  });
  const { validateStep: validateQuestion6, isSubmitted: isSubmitted6 } = useQuestionStorage({
    localStorageKey: "Question_6",
  });
  const { validateStep: validateQuestion6_1, isSubmitted: isSubmitted6_1 } = useQuestionStorage({
    localStorageKey: "Question_6_1",
  });
  const { validateStep: validateQuestion7, isSubmitted: isSubmitted7 } = useQuestionStorage({
    localStorageKey: "Question_7",
  });
  const { validateStep: validateQuestion8, isSubmitted: isSubmitted8 } = useQuestionStorage({
    localStorageKey: "Question_8",
  });


  const router = useRouter();

  const handleNext = () => {
    // Проверяем, что оба вопроса валидны перед переходом
    if (step === 0 && validateQuestion1() && validateQuestion2() && validateQuestion3() && validateQuestion4() && validateQuestion5() && validateQuestion6() && validateQuestion6_1() && validateQuestion7() && validateQuestion8()) {
      if (step === 0) {
        setStep(step + 1);
        router.push("/locale/BlankTwo");
      } else if (step === 1) {
        setStep(step + 1);
        router.push("/locale/BlankFinish");
      }
    }
  };

  const progressPercentage = Math.min(((step + 1) / 3) * 100, 100);

  const handleClearForm = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex justify-start p-4 gap-12 footerGap">
      <button
        onClick={handleNext}
        className="text-black p-2 rounded-md bg-white shadow-md w-full max-w-[6rem] TextSizeButtonNext"
      >
        Далее
      </button>

      {/* Ошибка, если один из вопросов не был выбран */}
      {step === 0 && (isSubmitted1 || isSubmitted2 || isSubmitted3 || isSubmitted4 || isSubmitted5 || isSubmitted6 || isSubmitted6_1 || isSubmitted7 || isSubmitted8) && (
        <div className="text-sm text-red-500 mt-2">
          Пожалуйста, ответьте на все обязательные вопросы.
        </div>
      )}

      {/* Прогресс бар */}
      <div className="w-[19rem] max-w-[46rem] mb-4 mt-4 progressBarWidth">
        <div className="h-3 bg-zinc-700 rounded-full">
          <div
            className="h-3 bg-sky-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-start items-center">
        <p className="min-w-[8rem] text-slate-950 textSize">Страница {step + 1} из 3 </p>
      </div>

      {/* Кнопка "Очистить форму" */}
      <button
        onClick={handleClearForm}
        className="text-black p-2 rounded-md bg-white shadow-md w-full max-w-[10rem] TextSizeButtonNext TextSizeButtonClear"
      >
        Очистить
      </button>
    </div>
  );
};

export default FooterActions;
