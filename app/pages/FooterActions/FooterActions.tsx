import React, { useState } from "react";
import { useValidate } from "../../components/Hooks/useValidate";
import { useSubmitSurvey } from "../../components/Hooks/useSubmitSurvey";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";

const FooterActions = () => {
  const { handleNext, error } = useValidate();
  const { handleSubmit, loading, errorMessage, submitSuccess } = useSubmitSurvey();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const onSubmit = async () => {
    const isValid = await handleNext(); // Проверяем валидацию
    if (isValid) {
      handleSubmit(); // Отправляем запрос на сервер
    } else {
      setShowErrorModal(true); // Показываем окно ошибки
    }
  };

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  return (<>
    {hasCompletedSurvey ? (
      ""
    ) : (
    <div className="flex flex-col items-center">
      <div className="flex p-4">
        <button
          onClick={onSubmit}
          className={`text-black p-3 rounded-md bg-white shadow-md w-full max-w-[6rem]`}
          disabled={loading} // Блокируем кнопку во время загрузки
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </div>

      {/* Окно ошибки */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-red-500">Ошибка!</h2>
            <p className="text-gray-700">
              Пожалуйста, ответьте на все обязательные вопросы.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

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
