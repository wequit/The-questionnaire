"use client";
import { useState, useEffect } from "react";
import Questions from "@/lib/utils/Questions.json";

export default function Question_Seven() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [otherText, setOtherText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Загружаем данные из localStorage, если они есть
    const savedOption = localStorage.getItem("Question_7");
    const savedOtherText = localStorage.getItem("Question_7_other");

    if (savedOption) {
      setSelectedOption(savedOption); // Восстанавливаем выбранный вариант
    }
    if (savedOtherText) {
      setOtherText(savedOtherText); // Восстанавливаем текст "Другое"
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_7", option); // Сохраняем выбранную опцию в localStorage

    // Если выбрано "Другое", сохраняем и текст
    if (option !== "Другое") {
      localStorage.removeItem("Question_7_other");
      setOtherText("");
    }

    setIsSubmitted(false); // Сбрасываем флаг ошибки
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherText(value);

    // Сохраняем текст для "Другое" в localStorage
    if (selectedOption === "Другое") {
      localStorage.setItem("Question_7_other", value);
    }
  };

  return (
    <section className="p-6 min-h-[350px]">
      {Questions.QuestionSeven.map((questionData, index) => (
    <div key={index} className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {questionData.questionSeven}
      </h2>
      <div className="text-gray-700 mb-6 mt-8">
        {questionData.optionsSeven.map((option, i) => (
          <div key={i} className="flex items-center mb-2 mt-4">
            <input
              id={`optionSeven-${i}`}
              name="Question_7"
              type="radio"
              className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
              onChange={() => handleOptionChange(option)}
              checked={selectedOption === option} // Проверка, активен ли этот вариант
            />
            <label htmlFor={option} className="ml-3 block text-gray-700">
              {option}
            </label>
          </div>
        ))}
        </div>
        </div>
      ))}

        {/* Показываем поле для ввода текста, если выбрано "Другое" */}
        {selectedOption === "Другое" && (
          <div className="mt-4 transition-all duration-300">
            <input
              type="text"
              value={otherText}
              onChange={handleOtherTextChange}
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-700 outline-none transition-all duration-300"
              placeholder="Введите ваш ответ..."
            />
          </div>
        )}

      {/* Проверяем, выбрана ли хотя бы одна радио-кнопка, и показываем ошибку при необходимости */}
      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </section>
  );
}
