"use client";
import { useEffect, useState } from "react";

export default function Question_Four() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Инициализация значения из localStorage для Question_4
    const storedOption = localStorage.getItem("Question_4");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_4", option); // Сохраняем выбранное значение
    setIsSubmitted(false); // Сбрасываем ошибку, если она есть
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        4. Сот имараты ар кандай категориядагы адамдар (майыптыгы бар адамдар, кыймылы чектелүү адамдар (кош бойлуу аялдар, жаракат алгандар) ж.б.) үчүн канчалык жеткиликтүү?
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
        <p>Такыр жеткиликтүү эмес</p>
        {["option_1", "option_2", "option_3", "option_4", "option_5"].map((option, index) => (
          <div key={option} className="flex items-center mb-2 mt-4">
            <input
              id={option}
              name="Question_4"
              type="radio"
              className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
              onChange={() => handleOptionChange(option)}
              checked={selectedOption === option}
            />
            <label htmlFor={option} className="ml-3 block text-gray-700">
              {index + 1}
            </label>
          </div>
        ))}
        <p>Толук жеткиликтүү</p>
      </div>

      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </div>
  );
}
