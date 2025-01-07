import { IoIosCheckmark } from "react-icons/io";
import { useRef, useState } from "react";

interface OtherOptionProps {
  questionId: number;
  isSelected: boolean;
  onOptionChange: (questionId: number, optionId: string) => void;
  customAnswer: string;
  setCustomAnswer: (value: string) => void;
}

export default function OtherOption({
  questionId,
  isSelected,
  onOptionChange,
  customAnswer,
  setCustomAnswer,
}: OtherOptionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleCustomAnswerChange = (value: string) => {
    setCustomAnswer(value);
    localStorage.setItem(`${questionId}_custom`, value);
    if (!isSelected) {
      onOptionChange(questionId, "custom");
    }

    // Появление кнопки крестика, если есть текст
    setShowClearButton(value.length > 0);
  };

  // Функция для установки фокуса на поле ввода
  const handleOptionChangeWithFocus = () => {
    onOptionChange(questionId, "custom");
    // Перемещаем фокус на поле ввода, если оно выбрано
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Функция для удаления текста и скрытия крестика
  const handleClearInput = () => {
    setCustomAnswer("");
    localStorage.removeItem(`${questionId}_custom`);
    setShowClearButton(false); // Скрываем крестик
  };

  return (
    <div className="flex items-start mb-4">
      <label
        htmlFor={`custom-option-${questionId}`}
        className="flex items-center cursor-pointer"
      >
        <input
          id={`custom-option-${questionId}`}
          name={`question-${questionId}`}
          type="radio"
          className="hidden peer"
          onChange={handleOptionChangeWithFocus} // Вызываем функцию при изменении радиокнопки
          checked={isSelected}
        />
        {/* Кастомная радиокнопка */}
        <div className="w-7 h-7 border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-100 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
          {isSelected && <IoIosCheckmark className="text-white w-6 h-6" />}
        </div>
        <span className="ml-4 text-lg text-gray-900">Другое:</span>
      </label>

      {/* Поле ввода всегда видно, даже если не выбрано "Другое:" */}
      <div className="ml-4 flex items-center gap-3 w-full">
        <div className="flex relative w-full">
          <input
            ref={inputRef} // Привязываем ref к полю ввода
            type="text"
            value={customAnswer}
            onChange={(e) => handleCustomAnswerChange(e.target.value)}
            className="w-full border-0 border-b-2 border-gray-300 px-3 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="Введите ваш ответ"
          />
          {/* Кнопка "крестик" появляется с анимацией, если выбрано "Другое:" и поле не пустое */}
          {isSelected && customAnswer && (
            <button
              type="button"
              onClick={handleClearInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-300 ${
                showClearButton ? "opacity-100" : "opacity-0"
              }`}
              title="Очистить"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
