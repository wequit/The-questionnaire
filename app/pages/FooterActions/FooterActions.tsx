import { useValidate } from "@/app/components/Hooks/useValidate";
import { useSubmitSurvey } from "@/app/components/Hooks/useSubmitSurvey";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";

const FooterActions = () => {
  const { handleClearForm, error, handleNext } = useValidate();
  const { handleSubmit, loading, errorMessage, submitSuccess } =
    useSubmitSurvey();

  const onSubmit = async () => {
    handleNext();
    if (!error) {
      console.log("Validation passed, submitting.");
      await handleSubmit();
    } else {
      console.log("Validation failed, not submitting.");
    }
  };

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  return (
    <>
      {hasCompletedSurvey ? (
        ""
      ) : (
        <div className="flex justify-between containerButtonFooter ">
          {/* Отображение сообщений об ошибке и успехе */}
          {errorMessage && (
            <div className="text-sm text-red-500 mt-2 p-4">{errorMessage}</div>
          )}

          {submitSuccess && (
            <div
              className={`text-lg font-bold text-emerald-900 mt-2 p-4 transition-opacity duration-500 ${
                submitSuccess ? "opacity-100" : "opacity-0"
              }`}
            >
              {submitSuccess}
            </div>
          )}

          {/* Новое сообщение об ошибке валидации */}
          {error && (
            <div className="text-sm text-red-500 mt-2 p-4">
              Пожалуйста, заполните все обязательные вопросы.
            </div>
          )}

          <div className="flex p-4  ">
            <button
              onClick={onSubmit}
              disabled={loading}
              className={`text-black p-3 rounded-md bg-white shadow-md w-full max-w-[6rem] `}
            >
              Отправить
            </button>
          </div>
          <div className="flex p-4  ">
            <button
              onClick={handleClearForm}
              className={`text-black p-2 rounded-md bg-white shadow-md w-full max-w-[10rem]`}
            >
              Очистить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterActions;
