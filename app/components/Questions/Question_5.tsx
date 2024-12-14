"use client";
import { useState, useEffect } from "react";
import Questions from "@/lib/utils/Questions.json";

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
    <section className="p-6">
      {Questions.QuestionFive.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionFive}
          </h2>
          <div className="text-gray-700 mb-6 mt-8">
            {questionData.optionsFive.map((option, i) => (
              <div key={i} className="flex items-center mb-2 mt-4">
                <input
                  id={`optionFive-${i}`}
                name="question_5"
                type="radio"
                className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange(questionData.optionsFive[i])}
                checked={selectedOption === questionData.optionsFive[i]} 
              />
              <label htmlFor={`optionFive-${i}`} className="ml-3 block text-gray-700">
                {questionData.optionsFive[i]}
              </label>
            </div>
            ))}
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
