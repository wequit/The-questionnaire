import { useValidate } from "@/app/components/Hooks/useValidate";
import { useSubmitSurvey } from "@/app/components/Hooks/useSubmitSurvey";

const FooterActions = () => {
  const { handleClearForm , error, handleNext} = useValidate();
  const { handleSubmit, loading, error: submitError } = useSubmitSurvey();

  const onSubmit = async () => {
    await handleSubmit();
    handleNext()
  };

  return (
    <div className="flex flex-col">
      {error && (
        <div className="text-sm text-red-500 mt-2 p-4">
          Пожалуйста, ответьте 
        </div>
      )}
      {submitError && (
        <div className="text-sm text-red-500 mt-2 p-4">{submitError}</div>
      )}
      <div className={`flex justify-start p-4 `}>
        <div className="flex gap-4">
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`text-black p-3 rounded-md bg-white shadow-md w-full max-w-[6rem] `}
          >
            Отправить
          </button>
        </div>

        <button
          onClick={handleClearForm}
          className={`text-black p-2 rounded-md bg-white shadow-md w-full max-w-[10rem]`}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default FooterActions;
