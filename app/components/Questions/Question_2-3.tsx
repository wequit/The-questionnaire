"use client";
import { useState } from "react";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        2. Жынысыңызды белгилеңиз*
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
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
            Женский
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
            Мужской
          </label>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        3. Жашыңызды көрсөтүңүз:*
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
        {["18–29", "30–44", "45-59", "60+"].map((age, index) => (
          <div key={age} className="flex items-center mb-2">
            <input
              id={`age${index}`}
              name="age"
              type="radio"
              className="h-5 w-5 text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
              onChange={() => handleAgeChange(age)}
              checked={selectedAge === age}
            />
            <label htmlFor={`age${index}`} className="ml-3 block text-gray-700">
              {age}
            </label>
          </div>
        ))}
      </div>

      {isSubmitted && (!selectedGender || !selectedAge) && (
        <div className="text-sm text-red-500 mt-2">
          Это обязательные вопросы.
        </div>
      )}
    </div>
  );
} 