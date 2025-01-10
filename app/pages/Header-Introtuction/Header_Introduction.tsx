import { useLanguage } from "@/lib/utils/LanguageContext";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import Flag from "react-world-flags";
import Image from "next/image";
import logo from "@/public/Logo.png";
import Completed from "../сompleted/Completed";
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
  const { courtName } = useAnswerContext(); // Теперь это объект с обоими значениями

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  const title = language === "ru" ? title_ru : title_kg;
  const description = language === "ru" ? description_ru : description_kg;

  // Извлекаем название суда в зависимости от языка
  const court = language === "ru" ? courtName?.ru : courtName?.kg;

  return (
    <div className="p-6 PaddingHeader">
      <div className="flex items-center mb-6 flex-col">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={100}
          className="mb-4 ContainerLogo"
        />
        <h3 className="text-2xl text-center text-gray-900 my-4 font-sans uppercase ContainerTittle">
          {`${title} ${court}`} {/* Отображаем название суда */}
        </h3>
        <hr className="border-t-2 border-gray-300 w-full mt-2" />
      </div>

      {hasCompletedSurvey ? (
        <Completed />
      ) : (
        <div>
          {/* Описание */}
          <p className="text-gray-800 mt-[3rem] leading-relaxed tracking-wide whitespace-pre-line ContainerDescription">
            {description}
          </p>

          {/* Контейнер для кнопки */}
          <div className="flex justify-center mt-6"> 
            <button
              onClick={toggleLanguage}
              className="px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-medium text-sm rounded-md shadow-lg flex items-center space-x-3 ease-in-out hover:from-sky-600 hover:to-sky-900 transition-transform duration-300"
            >
              {language === "ru" ? (
                <>
                  <span>Сменить язык</span>
                  <Flag
                    code="ru"
                    width={24}
                    height={24}
                    className="transition-transform hover:scale-110"
                  />
                  <span className="ml-2">Русский язык</span>
                </>
              ) : (
                <>
                  <span>Тилди өзгөртүү</span>
                  <Flag
                    code="kg"
                    width={24}
                    height={24}
                    className="transition-transform hover:scale-110"
                  />
                  <span className="ml-2">Кыргыз тили</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

