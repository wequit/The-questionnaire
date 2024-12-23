import { useValidate } from "@/app/components/Hooks/useValidate";
import { useSubmitSurvey } from "@/app/components/Hooks/useSubmitSurvey";

const FooterActions = () => {
  const { step, error, handleNext, handleBack, handleClearForm } = useValidate();
  const { handleSubmit, loading, error: submitError } = useSubmitSurvey();
  const progressPercentage = Math.min(((step + 1) / 3) * 100, 100);

  const onSubmit = async () => {
    if (step === 2) {
      await handleSubmit(); 
    } else {
      handleNext();
    }
  };

  return (
    <div className="flex flex-col">
      {error && (
        <div className="text-sm text-red-500 mt-2 p-4">
          Пожалуйста, ответьте на все обязательные вопросы.
        </div>
      )}
      {submitError && (
        <div className="text-sm text-red-500 mt-2 p-4">
          {submitError}
        </div>
      )}
      <div
        className={`flex justify-start p-4 ${
          step === 0 ? "footerGap" : "footerGapBlankTwo"
        } ${step === 2 ? "footerGapBlankThree" : ""}`}
      >
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className={`text-black p-3 rounded-md bg-white shadow-md w-full max-w-[6rem] ${
              step === 0
                ? "opacity-50 cursor-not-allowed hidden TextSizeButtonNext"
                : "TextSizeButtonNextBlankTwo"
            }`}
          >
            Назад
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className={`text-black p-3 rounded-md bg-white shadow-md w-full max-w-[6rem] ${
              step === 0 ? "TextSizeButtonNext" : "TextSizeButtonNextBlankTwo"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {step === 2 ? "Отправить" : "Далее"}
          </button>
        </div>

        <div
          className={`${
            step === 1 ? "progressBarWidthBlankTwo" : "progressBarWidth"
          } ${step === 2 ? "progressBarWidthBlankThree" : ""} w-[19rem] max-w-[46rem] mb-4 mt-4 transition-all duration-500`}
        >
          <div className="h-3 bg-zinc-700 rounded-full">
            <div
              className="h-3 bg-sky-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-start items-center">
          <p className="min-w-[8rem] text-slate-950 textSize">
            Страница {step + 1} из 3{" "}
          </p>
        </div>

        <button
          onClick={handleClearForm}
          className={`text-black p-2 rounded-md bg-white shadow-md w-full max-w-[10rem] ${
            step === 0 ? "TextSizeButtonClear" : "TextSizeButtonClearBlankTwo"
          }`}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default FooterActions;