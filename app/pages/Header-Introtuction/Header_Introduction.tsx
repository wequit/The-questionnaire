"use client";
import Flag from "react-world-flags";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import Completed from "../сompleted/page";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";

interface IntroductionProps {
  title_ru: string;
  title_kg: string;
  description_ru: string;
  description_kg: string;
}

export default function Introduction({
  title_ru,
  title_kg,
  description_ru,
  description_kg,
}: IntroductionProps) {
  const { language, toggleLanguage } = useLanguage();
  const { courtName } = useAnswerContext();

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  const title = language === "ru" ? title_ru : title_kg;
  const description = language === "ru" ? description_ru : description_kg;

  return (
    <div className="p-6">
      <div className="flex items-center mb-4 flex-col">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <h3 className="text-2xl text-center font-bold text-gray-900 ml-4 mt-4">
          {`${title} ${courtName}`}
        </h3>
      </div>
      {hasCompletedSurvey ? (
        <Completed />
      ) : (
        <div>
          {/* Описание */}
          <p className="text-base text-gray-700 mb-4 textSizeBody whitespace-pre-line ">
            {description}
          </p>

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
      )}
    </div>
  );
}
