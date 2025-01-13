import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Для изменения URL
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import Flag from "react-world-flags";
import Image from "next/image";
import logo from "@/public/Logo.png";
import Completed from "../Сompleted/Completed";
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
  const router = useRouter(); // Для управления маршрутом
  const pathname = usePathname(); // Текущий путь

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  const title = language === "ru" ? title_ru : title_kg;
  const description = language === "ru" ? description_ru : description_kg;
  const court = language === "ru" ? courtName?.ru : courtName?.kg;

  const handleLanguageChange = () => {
    toggleLanguage(); // Меняем язык в контексте

    // Обновляем путь, чтобы отразить изменение языка в URL
    const newLanguage = language === "ru" ? "ky" : "ru"; // Новый язык
    const newPath = pathname.replace(/^\/(ru|ky)/, `/${newLanguage}`);
    router.push(newPath); // Переход на новый маршрут с обновленным языком
  };

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
        <h3 className="font-medium text-center text-gray-900 my-6  uppercase ">
          <span className="block text-2xl  text-gray-700 ContainerTittle">
            {title}
          </span>
          <span className="block text-3xl font-semibold text-gray-900 mt-2 ContainerCourt">
            {court}
          </span>
        </h3>

        <hr className="border-t-2 border-gray-300 w-full mt-2" />
      </div>

      {hasCompletedSurvey ? (
        <Completed />
      ) : (
        <div>
          <p className="text-gray-800 mt-[3rem] font-inter leading-8 tracking-wide whitespace-pre-line break-words ContainerDescription">
            <span className="font-bold">{description.split("\r\n")[0]}</span>
            <br />
            {description
              .split("\r\n")
              .slice(1, -1)
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            <span className="font-bold">
              {description.split("\r\n").slice(-1)[0]}
            </span>
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleLanguageChange}
              className="ContainerHeaderButton my-2 px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-medium text-sm rounded-md shadow-lg flex items-center space-x-3 ease-in-out hover:from-sky-600 hover:to-sky-900 transition-transform duration-300"
            >
              {language === "ru" ? (
                <>
                  <span>Тилди өзгөртүү</span>
                  <Flag
                    code="kg"
                    width={24}
                    height={24}
                    className="transition-transform hover:scale-110 ContainerFlag"
                  />
                  <span className="ml-2">Кыргыз тили</span>
                </>
              ) : (
                <>
                  <span>Сменить язык</span>
                  <Flag
                    code="ru"
                    width={24}
                    height={24}
                    className="transition-transform hover:scale-110 ContainerFlag"
                  />
                  <span className="ml-2">Русский язык</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
