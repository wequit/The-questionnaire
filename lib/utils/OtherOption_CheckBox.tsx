import { IoIosCheckmark } from "react-icons/io";
import { useRef, useState } from "react";

interface OtherOptionCheckBoxProps {
  questionId: number;
  isSelected: boolean;
  onOptionChange: (optionId: string, isChecked: boolean) => void;
  customAnswer: string;
  setCustomAnswer: (value: string) => void;
}

export default function OtherOptionCheckBox({
  questionId,
  isSelected,
  onOptionChange,
  customAnswer,
  setCustomAnswer,
}: OtherOptionCheckBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localAnswer, setLocalAnswer] = useState(customAnswer);

  const handleCustomAnswerChange = (value: string) => {
    setLocalAnswer(value);

    setTimeout(() => {
      setCustomAnswer(value);
      localStorage.setItem(`${questionId}_custom`, value);
    }, 0);

    if (!isSelected) {
      onOptionChange("custom", true); // Отмечаем кастомный ответ как выбранный
    }
  };

  const handleClearInput = () => {
    setLocalAnswer("");
    setCustomAnswer("");
    localStorage.removeItem(`${questionId}_custom`);
    onOptionChange("custom", false); // Снимаем выбор с кастомного ответа
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    onOptionChange("custom", isChecked);

    if (!isChecked) {
      handleClearInput();
    }
  };

  return (
    <div className="flex items-center mb-4">
      <label
        htmlFor={`custom-option-${questionId}`}
        className="flex items-center cursor-pointer"
      >
        <input
          id={`custom-option-${questionId}`}
          name={`question-${questionId}`}
          type="checkbox"
          className="hidden peer"
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          checked={isSelected}
        />
        {/* Кастомный чекбокс */}
        <div className="w-7 h-7 border-2 ContainerRadio border-gray-300 rounded flex items-center justify-center relative peer-checked:border-blue-100 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
          {isSelected && <IoIosCheckmark className="text-white w-6 h-6" />}
        </div>
        <span className="ml-4 text-lg text-gray-900 ContainerOptionText">Другое:</span>
      </label>

      {/* Поле ввода отображается только при выборе "Другое:" */}
      <div className="ml-4 flex items-center gap-3 w-full">
        {isSelected && (
          <div className="flex relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={localAnswer}
              onChange={(e) => handleCustomAnswerChange(e.target.value)}
              className="w-full border-0 Placeholder border-b-2 border-gray-300 px-3 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Введите ваш ответ"
            />
            {localAnswer && (
              <button
                type="button"
                onClick={handleClearInput}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-300"
                title="Очистить"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
