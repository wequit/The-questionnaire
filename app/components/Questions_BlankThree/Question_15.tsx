"use client";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
// import Captcha from "@/app/components/Captcha/Captcha";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  is_required: boolean;
}

interface Question_Fifteen_Props {
  questions: Question[];
}

export default function Question_Fifteen({ questions }: Question_Fifteen_Props) {
  // const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null); // Используем null, чтобы правильно отображать "не пройдено"
  const { otherText, handleOtherTextChange } = useQuestionStorage({
    localStorageKey: "Question_15",
  });

  const question = questions.find((q) => q.id === 17);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  // // Функция, которая обновляет состояние в зависимости от проверки капчи
  // const handleCaptchaVerified
  //  = (isValid: boolean) => {
  //   setIsCaptchaValid(isValid);
  // };

  return (
    <section className="p-6 P-515">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
        <div className="mt-4">
          <input
            id="otherTextInput"
            className="w-full h-24 p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 textSizeOptions"
            placeholder="Менин жообум..."
            value={otherText} // Значение берется из хука
            onChange={(e) => handleOtherTextChange(e)} // Обновляет состояние и localStorage
          />
        </div>
      </div>
      {/* <Captcha /> */}
      
     
    </section>
  );
}
