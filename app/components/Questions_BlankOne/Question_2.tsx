import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

interface Option {
  id: number;
  text_ru: string;
  text_kg: string;
}

interface Question {
  id: number;
  is_required: boolean;
  options: Option[];
  text_ru: string;
  text_kg: string;
}

interface Question_Two_Props {
  questions: Question[];
}

export default function Question_Two({ questions }: Question_Two_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 2);

  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "2",
  });

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleChange = (optionId: number) => {
    handleOptionChange(optionId.toString());
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6 P-420">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{questionText}</h2>
      <div className="text-gray-700">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-4">
            <label
              htmlFor={`option-${option.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`option-${option.id}`}
                name="Question_Two"
                type="radio"
                className="hidden peer"
                onChange={() => handleChange(option.id)}
                checked={selectedOption === option.id.toString()}
              />
              {/* Кастомная радиокнопка */}
              <div className="w-7 h-7 border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-200 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
                {/* Галочка появляется, если радиокнопка активна */}
                {selectedOption === option.id.toString() && (
                  <IoIosCheckmark className="text-white w-6 h-6" />
                )}
              </div>
              <span className="ml-4 text-lg text-gray-900">{optionText(option)}</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}