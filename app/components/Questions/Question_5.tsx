"use client";
import { useState, useEffect } from "react";

export default function Question_Five() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedOption = localStorage.getItem("Question_5");
    if (savedOption) {
      setSelectedOption(savedOption); 
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    localStorage.setItem("Question_5", option);
    setIsSubmitted(false); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        5. Сот отуруму Сиз үчүн түшүнүктүү тилде өттүбү?*
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
        {["Ооба", "Жок", "Жарым-жартылай", "Жооп берүү кыйын"].map(
          (option) => (
            <div key={option} className="flex items-center mb-2 mt-4">
              <input
                id={option}
                name="question_5"
                type="radio"
                className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange(option)}
                checked={selectedOption === option} // Проверяем совпадение
              />
              <label htmlFor={option} className="ml-3 block text-gray-700">
                {option}
              </label>
            </div>
          )
        )}
      </div>
      
      {isSubmitted && !selectedOption && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}
    </div>
  );
}
