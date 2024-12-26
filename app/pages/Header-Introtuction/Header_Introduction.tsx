"use client";
import Flag from "react-world-flags";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useAnswerContext } from "@/lib/utils/AnswerContext";

interface IntroductionProps {
  title: string;
  description: string;
}

export default function Introduction({
  title,
  description,
}: IntroductionProps) {
  if (!title || !description) {
    return <div>Загрузка введения...</div>;
  }
  const { language, toggleLanguage } = useLanguage();
  const { courtName } = useAnswerContext();
  return (
    <div className="p-6">
      {/* Логотип */}
      <div className="flex justify-center mb-8">
        <Image
          src={logo}
          alt="Логотип"
          width={150}
          height={150}
          className="LogoWidth"
        />
      </div>

      {/* Заголовок */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6 textSizeTitle">
        {`${title} ${courtName}`} 
        </h3>
        
      </div>

      {/* Описание */}
      <p className="text-base text-gray-700 mb-4 textSizeBody whitespace-pre-line ">{description}</p>

      {/* Кнопка для переключения языка */}
      <button
        onClick={toggleLanguage}
        className="mt-6 px-6 py-3 bg-sky-800 text-white rounded-md flex items-center space-x-3 transition-all duration-300 ease-in-out transform hover:bg-sky-900 "
      >
        {language === "ru" ? (
          <>
            <span className="text-sm">Сменить язык</span>
            <Flag
              code="ru"
              width={24}
              height={24}
              className="transition-all transform hover:scale-110"
            />
            <span className="ml-2 text-sm">Русский</span>
          </>
        ) : (
          <>
            <span className="text-sm">Сменить язык</span>
            <Flag
              code="kg"
              width={24}
              height={24}
              className="transition-all transform hover:scale-110"
            />
            <span className="ml-2 text-sm">Киргизский</span>
          </>
        )}
      </button>
    </div>
  );
}
