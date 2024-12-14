"use client";

import { useState } from "react";
import Introduction from "./components/Introduction";
import Question_One from "./components/Questions/Question_1";
import Question_Two_Three from "./components/Questions/Question_2-3";
import Question_Four from "./components/Questions/Question_4";
import Question_Five from "./components/Questions/Question_5";
import Question_Six from "./components/Questions/Question_6";
import Question_Six_One from "./components/Questions/Question_6.1";
import Question_Seven from "./components/Questions/Question_7";
import Question_Eight from "./components/Questions/Question_8";

export default function Home() {
  const [step, setStep] = useState(0);
  const handleNext = () => {
    setStep(step + 1);
  };
  const progressPercentage = ((step + 1) / 3) * 100;
  const components = [
    <Question_One key={1} />,
    <Question_Two_Three key={2} />,
    <Question_Four key={3} />,
    <Question_Five key={4} />,
    <Question_Six key={5} />,
    <Question_Six_One key={6} />,
    <Question_Seven key={7} />,
    <Question_Eight key={8} />,
  ];

  const handleClearForm = () => {
    // Очистить все данные в localStorage
    localStorage.clear();

    // Перезагрузить страницу
    window.location.reload();
  };

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-gray-100 text-black bg-gradient-to-b from-slate-300 to-slate-500">
      {/* Контейнер для кнопки слева */}
      <div className="flex justify-center items-center flex-col w-full col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[46rem] mt-8">
          <Introduction />
        </div>

        {components.map((Component, index) => (
          <article key={index} className="container">
            {Component}
          </article>
        ))}

        <div className="flex justify-start p-4 gap-10">
          <button
            onClick={handleNext}
            className="text-black rounded-md bg-white shadow-md "
          >
            Далее
          </button>

          <div className="w-60 max-w-[46rem] mb-4 mt-4">
            <div className="h-2 bg-zinc-700 rounded-full">
              <div
                className="h-2 bg-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <p>Страница {step + 1} из 3 </p>

          {/* Кнопка "Очистить форму" */}
          <button
            onClick={handleClearForm}
            className="text-black p-2 rounded-md bg-white shadow-md w-full max-w-[10rem] mt-4"
          >
            Очистить форму
          </button>
        </div>
      </div>
    </div>
  );
}
