"use client";
import { useState } from "react";

export default function Question_Two_Three({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [selectedGender, setSelectedGender] = useState<string | null>(() => {
    const storedGender = localStorage.getItem("Gender_1");
    return storedGender ? JSON.parse(storedGender) : null;
  });
  const [selectedAge, setSelectedAge] = useState<string | null>(() => {
    const storedAge = localStorage.getItem("Age_1");
    return storedAge ? JSON.parse(storedAge) : null;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    setIsSubmitted(true);
    if (!selectedGender || !selectedAge) {
      return;
    }
    localStorage.setItem("Gender_1", selectedGender);
    localStorage.setItem("Age_1", selectedAge);
    onNext();
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
            onChange={() => setSelectedGender("female")}
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
            onChange={() => setSelectedGender("male")}
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
              onChange={() => setSelectedAge(age)}
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
          Этот обязательные вопросы.
        </div>
      )}
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="outline-none w-28 bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-zinc-300 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="outline-none w-28 bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-zinc-300 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Далее
        </button>
      </div>
    </div>
  );
} 