import { useState, useEffect } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOption from "@/lib/utils/OtherOption";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import OtherOptionCheckBox from "@/lib/utils/OtherOption_CheckBox";
import { useValidate } from "../Hooks/useValidate"; // Импортируем хук для валидации

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

interface Question_Sixteen_Props {
  questions: Question[];
}

export default function Question_Sixteen({
  questions,
}: Question_Sixteen_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 16);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate(); // Используем хук для обновления статуса
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey:  question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question?.id}_custom`) || ""
      : ""
  );

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedOption ? selectedOption.split(",") : []
  );

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;
  const filteredOptions = question.options.filter(
    (_, index) => index !== otherOptionIndex
  );

  const handleCheckboxChange = (optionId: string, questionId: number) => {
    const updatedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(updatedOptions);
    handleOptionChange(updatedOptions.join(","));
    updateAnsweredStatus(questionId, true)
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section
    id={`question-${question.id}`}
      className="p-10 Padding"
      data-question-answered="true"
    >
      <h2 className="text-lg font-semibold font-inter text-gray-900 mb-6 ContainerQuestion">
        {questionText}
      </h2>
      <div className="text-gray-700 font-inter">
        {/* Отображаем только фильтрованные опции */}
        {filteredOptions.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-4">
            <label
              htmlFor={`option-${option.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`option-${option.id}`}
                name={`question-${question.id}`}
                type="checkbox"
                className="hidden peer"
                onChange={() => handleCheckboxChange(option.id.toString(), question.id )}
                checked={selectedOptions.includes(option.id.toString())}
              />
              {/* Кастомная чекбокс-кнопка */}
              <div className="w-9 h-9 ContainerRadio border-2 border-gray-300 rounded flex items-center justify-center relative 
              peer-checked:border-emerald-500   peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
                {/* Галочка появляется, если чекбокс активен */}
                {selectedOptions.includes(option.id.toString()) && (
                  <IoIosCheckmark className="text-white w-6 h-6" />
                )}
              </div>
              <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
                {optionText(option)}
              </span>
            </label>
          </div>
        ))}

        {/* Добавляем компонент для "Другое:" */}
        {otherOption && (
          <OtherOptionCheckBox
            questionId={question.id}
            isSelected={selectedOptions.includes("custom")}
            onOptionChange={() => handleCheckboxChange("custom", question.id)}
            customAnswer={customAnswer}
            setCustomAnswer={setCustomAnswer}
            language={language}
          />
        )}
      </div>
    </section>
  );
}
