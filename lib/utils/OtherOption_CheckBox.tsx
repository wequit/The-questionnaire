import { IoIosCheckmark } from "react-icons/io";
import { useRef, useState } from "react";

interface OtherOptionCheckBoxProps {
  questionId: number;
  isSelected: boolean;
  onOptionChange: (optionId: string, isChecked: boolean) => void;
  customAnswer: string;
  setCustomAnswer: (value: string) => void;
  language: "ru" | "kg";
}

export default function OtherOptionCheckBox({
  questionId,
  isSelected,
  onOptionChange,
  customAnswer,
  setCustomAnswer,
  language,
}: OtherOptionCheckBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localAnswer, setLocalAnswer] = useState(customAnswer);

  // Обработка изменений в поле ввода
  const handleCustomAnswerChange = (value: string) => {
    setLocalAnswer(value);

    // Сохраняем кастомный ответ в состоянии и localStorage
    setTimeout(() => {
      setCustomAnswer(value);
      localStorage.setItem(`${questionId}_custom`, value);
    }, 0);

    if (!isSelected) {
      onOptionChange("custom", true); // Выбираем кастомный ответ
    }
  };

  // Очистка кастомного ответа
  const handleClearInput = () => {
    setLocalAnswer("");
    setCustomAnswer("");
    localStorage.removeItem(`${questionId}_custom`);
    onOptionChange("custom", false); // Снимаем выбор с кастомного ответа
  };

  // Обработка изменения состояния чекбокса
  const handleCheckboxChange = (isChecked: boolean) => {
    onOptionChange("custom", isChecked);

    if (!isChecked) {
      handleClearInput();
    } else {
      inputRef.current?.focus(); // Фокус на поле ввода при выборе чекбокса
    }
  };

  return (
    <div className="flex justify-center items-center mb-4">
      {/* Чекбокс с кастомной меткой */}
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
        {/* Кастомный стиль чекбокса */}
        <div className="w-9 h-9 border-2 ContainerRadio border-gray-300 rounded flex items-center justify-center relative 
        peer-checked:border-emerald-500   peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
          {isSelected && <IoIosCheckmark className="text-white w-6 h-6" />}
        </div>
        <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
          {language === "ru" ? "Другое:" : "Башка:"}
        </span>
      </label>

      {/* Текстовое поле для ввода ответа отображается только при выборе чекбокса */}
      <div className="ml-4 flex items-center gap-3 w-full relative">
        {isSelected && (
          <input
            ref={inputRef}
            type="text"
            value={localAnswer}
            onChange={(e) => handleCustomAnswerChange(e.target.value)}
            className="w-full border-0 appearance-none Placeholder border-b-2 border-gray-300 px-3 py-1 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out pr-8"
            placeholder={
              language === "ru" ? "Введите ваш ответ" : "Жообуңузду киргизиңиз"
            }
          />
        )}
        {/* Кнопка для очистки поля */}
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
