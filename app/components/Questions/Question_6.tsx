"use client";
import { useState, useEffect } from "react";

export default function Question_Six() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Сохраняем выбранный вариант из localStorage
    const savedOption = localStorage.getItem("Question_6");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option); // Обновляем состояние выбранного варианта
    localStorage.setItem("Question_6", option); // Сохраняем выбранный вариант в localStorage
    setIsSubmitted(false); // Сбрасываем состояние отправки
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        6. Сот кызматкерлеринин сизге болгон мамилесин кандай баалайт элеңиз?
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
        {[
          "Урматтоо менен болгон мамиле",
          "Нейтралдуу мамиле",
          "Урматсыздык менен болгон мамиле",
        ].map((option) => (
          <div key={option} className="flex items-center mb-2 mt-4">
            <input
              id={option}
              name="Question_6"
              type="radio"
              className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
              onChange={() => handleOptionChange(option)} // Обработчик изменения
              checked={selectedOption === option} // Проверка, выбран ли этот вариант
            />
            <label htmlFor={option} className="ml-3 block text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
      
      {/* Показываем ошибку, если ни один вариант не выбран */}
      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </div>
  );
}
