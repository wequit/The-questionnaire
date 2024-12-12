"use client";
import { useState } from "react";

export default function Introduction({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem("email") || "";
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    setIsSubmitted(true);
    if (!email) {
      return;
    }
    localStorage.setItem("email", email);
    onNext();
  };

  const textContent = {
    title: "Анкета обратной связи Административного суда Нарынской области",
    greeting: "Уважаемый гражданин!",
    body: `Пришло время внести свой вклад в улучшение работы районного суда! Просим
    вас ответить на несколько вопросов, которые помогут нам повысить
    эффективность нашей работы и расширить доступ к правосудию для всех
    жителей Нарынской области. Оценка является конфиденциальной и не
    повлияет на ваше судебное разбирательство. Отзывы будут учтены при
    принятии решений и мы постараемся на них реагировать.`,
    closing: "С уважением, Административный суд Нарынской области",
    callToAction:
      "Внесите свой вклад в изменение системы правосудия с помощью отзывов!",
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {textContent.title}
      </h1>
      <p className="text-lg font-semibold text-gray-800 mb-4">
        {textContent.greeting}
      </p>
      <p className="text-base text-gray-700 mb-4">{textContent.body}</p>
      <p className="text-base text-gray-700 mb-4 mt-20">
        <strong>{textContent.closing}</strong>
      </p>
      <p className="text-base text-gray-700 mb-6 italic">
        {textContent.callToAction}
      </p>

      <label htmlFor="email" className="block text-lg font-bold text-gray-700">
        Электронная почта
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        value={email}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />

      {isSubmitted && !email && (
        <div className="text-sm text-red-500 mt-2">
          Этот обязательный вопрос.
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleNext}
          className="w-40 bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-zinc-300 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
