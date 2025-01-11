import { IoIosCheckmark } from "react-icons/io";
import { useRef, useState } from "react";
import { useAnswerContext } from "./AnswerContext";

interface OtherOptionProps {
  questionId: number;
  isSelected: boolean;
  onOptionChange: (questionId: number, optionId: string) => void;
  customAnswer: string;
  setCustomAnswer: (value: string) => void;
  language: "ru" | "kg";
}

export default function OtherOption({
  questionId,
  isSelected,
  onOptionChange,
  customAnswer,
  setCustomAnswer,
  language,
}: OtherOptionProps) {
  const { questions } = useAnswerContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localAnswer, setLocalAnswer] = useState(customAnswer);

  const question = questions.find((q) => q.id === questionId);

  const getLocalizedText = (option: { text_ru: string; text_kg: string }) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const otherOption =
    question?.options.find(
      (opt) => getLocalizedText(opt) === (language === "ru" ? "Другое:" : "Башка:")
    ) || null;

  const lastAnswer = question?.options
    ? question.options[question.options.length - 1]?.text_ru
    : null;

  const handleCustomAnswerChange = (value: string) => {
    setLocalAnswer(value);
    setTimeout(() => {
      setCustomAnswer(value);
      localStorage.setItem(`${questionId}_custom`, value);
    }, 0);

    if (!isSelected) {
      onOptionChange(questionId, "custom");
    }
  };

  const handleOptionChangeWithFocus = () => {
    onOptionChange(questionId, "custom");
    inputRef.current?.focus();
  };

  const handleClearInput = () => {
    setLocalAnswer("");
    setCustomAnswer("");
    localStorage.removeItem(`${questionId}_custom`);
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <label
        htmlFor={`custom-option-${questionId}`}
        className="flex items-center cursor-pointer"
      >
        <input
          id={`custom-option-${questionId}`}
          name={`question-${questionId}`}
          type="radio"
          className="hidden peer"
          onChange={handleOptionChangeWithFocus}
          checked={isSelected}
        />
        {/* Кастомная радиокнопка */}
        <div
          className="w-7 h-7 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-100 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out"
          onClick={handleOptionChangeWithFocus}  // Добавлено для активации радиокнопки
        >
          {isSelected && <IoIosCheckmark className="text-white w-6 h-6" />}
        </div>
        <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
          {language === "ru" ? "Другое:" : "Башка:"}
        </span>
      </label>

      <div className="ml-4 flex items-center gap-3 w-full relative">
        <input
          ref={inputRef}
          type="text"
          value={localAnswer}
          onChange={(e) => handleCustomAnswerChange(e.target.value)}
          className="w-full border-0 Placeholder border-b-2 border-gray-300 px-3 py-1 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out pr-8"
          placeholder={
            language === "ru" ? "Введите ваш ответ" : "Жообуңузду киргизиңиз"
          }
          onClick={handleOptionChangeWithFocus}  // Добавлено для активации радиокнопки
        />
        {localAnswer && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-300 px-2"
            title={language === "ru" ? "Очистить" : "Тазалоо"}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

