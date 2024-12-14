"use client";
import { useState, useEffect } from "react";
import Questions from "@/lib/utils/Questions.json";

export default function Question_Six() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedOption = localStorage.getItem("Question_6");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_6", option);
    setIsSubmitted(false);
  };

  return (
    <section className="p-6">
      {Questions.QuestionSix.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionSix}
          </h2>
          <div className="text-gray-700 mb-6 mt-8">
            {questionData.optionsSix.map((option, i) => (
              <div key={i} className="flex items-center mb-2 mt-4">
                <input
                  id={`optionSix-${i}`}
              name="Question_6"
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

      {/* Показываем ошибку, если ни один вариант не выбран */}
      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </section>
  );
}
