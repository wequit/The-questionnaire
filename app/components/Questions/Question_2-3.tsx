"use client";
import { useState } from "react";
import Questions from "@/lib/utils/Questions.json";

export default function Question_Two_Three() {
  const [selectedGender, setSelectedGender] = useState<string | null>(() => {
    return localStorage.getItem("Question_2") || null;
  });
  const [selectedAge, setSelectedAge] = useState<string | null>(() => {
    return localStorage.getItem("Question_3") || null;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    localStorage.setItem("Question_2", gender);
    if (selectedAge) {
      setIsSubmitted(false);
    }
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(age);
    localStorage.setItem("Question_3", age);
    if (selectedGender) {
      setIsSubmitted(false);
    }
  };

  return (
    <section className="p-6">
      {Questions.QuestionTwo.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionTwo}
          </h2>

          <div className="text-gray-700 mb-6 mt-8">
            <div className="flex items-center mb-2">
              <input
                id="gender1"
                name="gender"
                type="radio"
                className="h-5 w-5 text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
                onChange={() => handleGenderChange("female")}
                checked={selectedGender === "female"}
              />
              <label htmlFor="gender1" className="ml-3 block text-gray-700">
                {questionData.optionsTwo[0]}
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="gender2"
                name="gender"
                type="radio"
                className="h-5 w-5 text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
                onChange={() => handleGenderChange("male")}
                checked={selectedGender === "male"}
              />
              <label htmlFor="gender2" className="ml-3 block text-gray-700">
                {questionData.optionsTwo[1]}
              </label>
            </div>
          </div>
        </div>
      ))}

      {Questions.QuestionThree.map((questionData, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {questionData.questionThree}
          </h2>
          <div className="text-gray-700 mb-6 mt-8">
            {/* Перебираем optionsThree внутри каждого вопроса */}
            {questionData.optionsThree.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  id={`age${index}-${optionIndex}`} // уникальный id для каждого input
                  name="age"
                  type="radio"
                  className="h-5 w-5 text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
                  onChange={() => handleAgeChange(option)} // передаем сам вариант
                  checked={selectedAge === option} // проверка, выбран ли этот вариант
                />
                <label
                  htmlFor={`age${index}-${optionIndex}`}
                  className="ml-3 block text-gray-700"
                >
                  {option} {/* текст варианта */}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isSubmitted && (!selectedGender || !selectedAge) && (
        <div className="text-sm text-red-500 mt-2">
          Это обязательные вопросы.
        </div>
      )}
    </section>
  );
}