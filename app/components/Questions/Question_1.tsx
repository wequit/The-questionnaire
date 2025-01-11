import React, { useState, useEffect } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOption from "@/lib/utils/OtherOption";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useValidate } from "../Hooks/useValidate";

interface Option {
  id: number;
  text_ru: string;
  text_kg: string;
}

interface Question {
  id: number;
  text_ru: string;
  text_kg: string;
  is_required: boolean;
  options: Option[];
}

interface Question_One_Props {
  questions: Question[];
}

export default function Question_One({ questions }: Question_One_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 1);

  if (!question) {
    return <div>Loading...</div>;
  }

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;
  const filteredOptions = question.options.filter(
    (_, index) => index !== otherOptionIndex
  );

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question?.id}_custom`) || ""
      : ""
  );

  // Состояние для ошибки
  const [hasError, setHasError] = useState(false);

  // Обновление ответа
  const handleChange = (questionId: number, optionId: string) => {
    if (optionId === "custom") {
      handleOptionChange(optionId);
      updateAnsweredStatus(questionId, true);
      setHasError(false);
    } else {
      handleOptionChange(optionId);
      updateAnsweredStatus(questionId, true);
      setHasError(false);
    }
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;


  return (
    <section
      className="p-10 Padding"
      id={`question-${question.id}`}
      data-question-answered='true'
    >
      <h2 className="text-lg font-semibold font-inter text-gray-900 mb-2 ContainerQuestion">
        {questionText}
      </h2>
      {hasError && (
        <p className="text-red-500 text-sm mb-4">
          Пожалуйста, ответьте на этот вопрос.
        </p>
      )}
      <div className="text-gray-700 mt-4 font-inter">
        {filteredOptions.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-4">
            <label
              htmlFor={`option-${option.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`option-${option.id}`}
                name={`question-${question.id}`}
                type="radio"
                className="hidden peer"
                onChange={() => handleChange(question.id, option.id.toString())}
                checked={selectedOption === option.id.toString()}
              />
              <div className="w-7 h-7 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-100 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
                {selectedOption === option.id.toString() && (
                  <IoIosCheckmark className="text-white w-6 h-6" />
                )}
              </div>
              <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
                {optionText(option)}
              </span>
            </label>
          </div>
        ))}

        {otherOption && (
          <OtherOption
            questionId={question.id}
            isSelected={selectedOption === "custom"}
            onOptionChange={handleChange}
            customAnswer={customAnswer}
            setCustomAnswer={setCustomAnswer}
            language={language}
          />
        )}
      </div>
      
    </section>
  );
}
