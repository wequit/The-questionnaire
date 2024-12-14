"use client";
import { useEffect, useState } from "react";
import Questions from "@/lib/utils/Questions.json";

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
    <section className="p-6">
      {Questions.QuestionFour.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionFour}
          </h2>
          <div className="text-gray-700 mb-6 mt-8">
            <p>{questionData.TextOne}</p>

            {/* Перебор вариантов из optionsFour */}
            {questionData.optionsFour.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2 mt-4">
                <input
                  id={`optionFour-${optionIndex}`} // Уникальный id для каждой радиокнопки
                  name="Question_4"
                  type="radio"
                  className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                  onChange={() => handleOptionChange(option.toString())}
                  checked={selectedOption === option.toString()}
                />
                <label htmlFor={`optionFour-${optionIndex}`} className="ml-3 block text-gray-700">
                  {option} {/* отображаем значение из optionsFour */}
                </label>
              </div>
            ))}

            <p>{questionData.TextTwo}</p>
          </div>
        </div>
      ))}

      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </section>
  );
}
