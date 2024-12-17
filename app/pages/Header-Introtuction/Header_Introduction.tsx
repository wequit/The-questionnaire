"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/Logo.png";

export default function Introduction() {
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Инициализация значения из localStorage для Question_4
    const storedOption = localStorage.getItem("email");
    if (storedOption) {
      setEmail(storedOption);
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setEmail(option);
    localStorage.setItem("email", option); // Сохраняем выбранное значение
    setIsSubmitted(false); // Сбрасываем ошибку, если она есть
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
      <div className="flex justify-center mb-8">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="LogoWidth"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 textSizeTitle">
          {textContent.title}
        </h1>
      </div>

      <p className="text-lg font-semibold text-gray-800 mb-4 mt-24 textSizeGreeting ">
        {textContent.greeting}
      </p>
      <p className="text-base text-gray-700 mb-4 textSizeBody">{textContent.body}</p>
      <p className="text-base text-gray-700 mb-4 mt-20 textSizeClosing">
        <strong>{textContent.closing}</strong>
      </p>
      <p className="text-base text-gray-700 mb-6 italic textSizeCallToAction">
        {textContent.callToAction}
      </p>

    </div>
  );
}
