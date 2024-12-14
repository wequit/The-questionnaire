"use client";
import { useState, useEffect } from "react";
import Questions from "@/lib/utils/Questions.json";

export default function Question_One() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Инициализация значения из localStorage
    const storedOption = localStorage.getItem("Question_1");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_1", option);
    setIsSubmitted(false); // Сбрасываем ошибку при выборе опции
  };

  return (
    <section className="p-6">
      {Questions.QuestionOne.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionOne}
          </h2>

          <div className=" text-gray-700">
            {questionData.optionsOne.map((option, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  id={option}
                  name="Question_One"
                  type="radio"
                  className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                  onChange={() => handleOptionChange(option)}
                  checked={selectedOption === option}
                />
                <label htmlFor={option} className="ml-3 block text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Это обязательный вопрос.
        </div>
      )}
    </section>
  );
}
