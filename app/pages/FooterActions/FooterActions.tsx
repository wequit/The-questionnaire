import React from "react";
import { useValidate } from "../../components/Hooks/useValidate";
import { useSubmitSurvey } from "../../components/Hooks/useSubmitSurvey";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useLanguage } from "@/lib/utils/LanguageContext";

const FooterActions = () => {
  const { handleNext } = useValidate();
  const { handleSubmit, loading, scrollToFirstUnansweredQuestion } =
    useSubmitSurvey();
  const { setValidError, questions } = useAnswerContext();
  const { language } = useLanguage();

  const onSubmit = async () => {
    
    const unansweredQuestions = questions.filter((question) => {
      if (question.id === 13 || question.id > 18) return false;
     

      const questionElement = document.getElementById(`question-${question.id}`);
      const isAnswered = questionElement?.getAttribute("data-question-answered") === "true";
      const selectedOption = localStorage.getItem(question.id.toString());
      
      const otherOption = question.options.find(
        (option) => option.text_ru === "Другое:" || option.text_kg === "Башка:"
      );

      if (selectedOption === otherOption?.id.toString() && question.id !== 18) {
        const customAnswer = localStorage.getItem(`${question.id}_custom`);
        
        if (!customAnswer || customAnswer.trim() === "") {
          console.warn(
            `Неотвеченный вопрос (пустое поле "Другое:"): ${question.id}`
          );
          return true;
        }
      }

      if (!isAnswered) {
        console.warn(
          `Неотвеченный вопрос: ${question.id}, текст: ${
            question.text_ru || question.text_kg
          }`
        );
        return true;
      }

      return false;
    });

    if (unansweredQuestions.length > 0) {
      const firstUnanswered = unansweredQuestions[0];
      const firstUnansweredElement = document.getElementById(
        `question-${firstUnanswered.id}`
      );

      if (firstUnansweredElement) {
        firstUnansweredElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      unansweredQuestions.forEach((unansweredQuestion) => {
        setValidError(unansweredQuestion.id, true);
      });

      return;
    }

    const isValid = await handleNext();

    if (isValid) {
      handleSubmit();
      window.location.reload();
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

  const submitText = language === "ru" ? "Отправить" : "Жөнөтүү";
  const clearText = language === "ru" ? "Очистить ответы" : "Жоопторду тазалоо";

  return (
    <>
      {hasCompletedSurvey ? (
        ""
      ) : (
        <div className="flex justify-between items-center containerButtonFooter my-6 gap-6">
          <button
            onClick={handleClearAnswers}
            className="text-red-600 font-inter text-md p-4 rounded-lg bg-white shadow-lg touch-manipulation hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 transform w-full max-w-[12rem] ContainerButtonClear"
          >
            {clearText}
          </button>

          <button
            onClick={onSubmit}
            className={`text-green-800 p-4 font-sans text-md rounded-lg bg-white shadow-lg  touch-manipulation focus:outline-none focus:ring-2  transition-all duration-300 transform w-full max-w-[9rem] ContainerButtonSend`}
            disabled={loading}
          >
            {loading
              ? language === "ru"
                ? "Отправка..."
                : "Жөнөтүлүүдө"
              : submitText}
          </button>
        </div>
      )} 
    </>
  );
};

export default FooterActions;
