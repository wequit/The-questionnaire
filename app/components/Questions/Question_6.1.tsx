"use client";
import { useState } from "react";

export default function Question_Six_One({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
        const savedOptions = localStorage.getItem("Question_6");
        return savedOptions ? JSON.parse(savedOptions) : [];
      });
      const [isSubmitted, setIsSubmitted] = useState(false);

      const handleOptionChange = (option: string) => {
        setSelectedOptions((prev) => {
          if (prev.includes(option)) {
            // Удаляем опцию, если она уже выбрана
            return prev.filter((item) => item !== option);
          } else {
            // Добавляем новую опцию
            return [...prev, option];
          }
        });
      };
      

      const handleNext = () => {
        setIsSubmitted(true);
        if (selectedOptions.length === 0) {
          return;
        }
        localStorage.setItem("Question_6_1", selectedOptions[0]);
        onNext();
      };
      
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
      6.1. Урматсыздык менен болгон мамиле болсо, кандай түрү? (мисалдарды же жагдайларды тандаңыз)
      </h2>
      <div className="text-lg text-gray-700 mb-6 mt-8">
      
      {["орой мамиле кылды", "көрмөксөнгө салды", "сөздү үздү", "сөз бербеди"].map((option, index) => (
          <div key={option} className="flex items-center mb-2 mt-4">
            <input
              id={option}
              name="source"
              type="checkbox"
              className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
              onChange={() => handleOptionChange(option)}
              checked={selectedOptions.includes(option)}
            />
            <label htmlFor={option} className="ml-3 block text-gray-700">
              {[
                "орой мамиле кылды",
                "көрмөксөнгө салды",
                "сөздү үздү",
                "сөз бербеди",
              ][index]}
            </label>
          </div>
        ))}
        
      </div>
      {isSubmitted && !selectedOptions && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
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
