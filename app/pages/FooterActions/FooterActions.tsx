import React from "react";
import { useValidate } from "../../components/Hooks/useValidate";
import { useSubmitSurvey } from "../../components/Hooks/useSubmitSurvey";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useLanguage } from "@/lib/utils/LanguageContext";

const FooterActions = () => {
  const { handleNext } = useValidate();
  const {
    handleSubmit,
    loading,
    errorMessage,
    submitSuccess,
    scrollToFirstUnansweredQuestion,
  } = useSubmitSurvey();
  const { setValidError, questions } = useAnswerContext();
  const { language } = useLanguage(); // Получаем текущий язык

  const onSubmit = async () => {
    // Найти все неотвеченные вопросы
    const unansweredQuestions = questions.filter((question) => {
      const questionElement = document.getElementById(`question-${question.id}`);
      return questionElement?.getAttribute("data-question-answered") !== "true";
    });

    if (unansweredQuestions.length > 0) {
      // Прокрутить к первому неотвеченному вопросу
      scrollToFirstUnansweredQuestion();

      // Установить ошибки для всех неотвеченных вопросов
      unansweredQuestions.forEach((unansweredQuestion) => {
        requestAnimationFrame(() => {
          setValidError(unansweredQuestion.id, true);
        });
      });
    } else {
      // Если все вопросы отвечены, выполняем дальнейшие действия
      const isValid = await handleNext();
      if (isValid) {
        handleSubmit();
      }
    }
  };

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  const handleClearAnswers = () => {
    Object.keys(localStorage).forEach((key) => {
      if (!isNaN(Number(key))) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_custom`);
      }
    });

    window.location.reload();
  };

  // Тексты для кнопок в зависимости от языка
  const submitText = language === "ru" ? "Отправить" : "Жөнөтүү";
  const clearText = language === "ru" ? "Очистить ответы" : "Жоопторду тазалоо";

  return (
    <>
      {hasCompletedSurvey ? (
        ""
      ) : (
        <div className="flex justify-between items-center containerButtonFooter my-4 gap-4">
          <button
            onClick={handleClearAnswers}
            className="text-red-500 font-inter text-md p-4 rounded-lg bg-white shadow-lg hover:bg-red-100 transition-all duration-300 transform  w-full max-w-[12rem] ContainerButtonClear"
          >
            {clearText}
          </button>

          <button
            onClick={onSubmit}
            className={`text-green-700 p-4 font-inter text-md rounded-lg bg-white shadow-lg hover:bg-green-100 transition-all duration-300 transform  w-full max-w-[9rem] ContainerButtonSend`}
            disabled={loading}
          >
            {loading ? (language === "ru" ? "Отправка..." : "Жөнөтүлүүдө...") : submitText} {/* Текст кнопки отправки */}
          </button>

          {/* Успешное сообщение */}
          {submitSuccess && (
            <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <p>{submitSuccess}</p>
            </div>
          )}

          {/* Ошибка от сервера */}
          {errorMessage && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FooterActions;
