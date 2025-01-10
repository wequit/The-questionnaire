import React, { useMemo } from "react";
import { useValidate } from "../../components/Hooks/useValidate";
import { useSubmitSurvey } from "../../components/Hooks/useSubmitSurvey";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import { useAnswerContext} from "@/lib/utils/AnswerContext";

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
        })
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

  return (
    <>
      {hasCompletedSurvey ? (
        ""
      ) : (
        <div className="flex justify-between items-center containerButtonFooter my-4">
          <button
            onClick={onSubmit}
            className={`text-black p-3 font-inter rounded-md bg-white shadow-md w-full max-w-[9rem] ContainerButtonSend`}
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>

          <button
            onClick={handleClearAnswers}
            className="text-red-900 font-inter p-3 rounded-md bg-white shadow-md w-full max-w-[12rem] ContainerButtonClear"
          >
            Очистить ответы
          </button>

          {/* Успешное сообщение */}
          {submitSuccess && (
            <div className="mt-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
              <p>{submitSuccess}</p>
            </div>
          )}

          {/* Ошибка от сервера */}
          {errorMessage && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FooterActions;
