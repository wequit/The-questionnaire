import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useValidate } from "../Hooks/useValidate";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { CgDanger } from "react-icons/cg";

interface Option {
  id: number;
  text_ru: string;
  text_kg: string;
}

interface Question {
  id: number;
  text_ru: string;
  text_kg: string;
  is_required: boolean;
  options: Option[];
}

interface Question_Four_Props {
  questions: Question[];
}

export default function Question_Fourr({ questions }: Question_Four_Props) {
  const { language } = useLanguage();
  const { setValidError, getValidError } = useAnswerContext();
  const question = questions.find((q) => q.id === 4);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const handleChange = (questionId: number, optionId: string) => {
    handleOptionChange(optionId);
    updateAnsweredStatus(questionId, true);

    if (!selectedOption && getValidError(questionId)) {
      setValidError(questionId, false);
    }
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError = !selectedOption && getValidError(question.id);

  return (
    <article className="container responsive min-h-[300px]!important">
      <section
        id={`question-${question.id}`}
        className="p-10 Padding"
        data-question-answered={selectedOption ? "true" : "false"}
      >
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold font-inter text-gray-900 mb-4 ContainerQuestionEX">
            {questionText}
          </h2>
          <span
            className={`text-red-500 text-2xl font-bold ${
              selectedOption ? "true" : "false" ? "visible" : "invisible"
            }`}
          >
            *
          </span>
        </div>

        <div className="text-gray-700 font-inter">
          {question.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-4">
              <label
                htmlFor={`option-${option.id}`}
                className="flex items-center cursor-pointer"
              >
                <input
                  id={`option-${option.id}`}
                  name={`question-${question.id}`}
                  type="radio"
                  className="hidden peer"
                  onChange={() =>
                    handleChange(question.id, option.id.toString())
                  }
                  checked={selectedOption === option.id.toString()}
                />
                <div
                  className="w-9 h-9  flex-shrink-0 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative 
                peer-checked:border-emerald-500   peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out"
                >
                  {selectedOption === option.id.toString() && (
                    <IoIosCheckmark className="text-white w-6 h-6" />
                  )}
                </div>
                <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
                  {optionText(option)}
                </span>
              </label>
            </div>
          ))}

         
        </div>
        {isError && (
          <div className="text-red-600 flex items-center">
            <CgDanger className="w-7 h-7 NecessarilySvg" />
            <h2 className="ml-3 NecessarilyText">
              {language === "ru"
                ? "Это обязательный вопрос."
                : "Бул милдеттүү суроо."}
            </h2>
          </div>
        )}
      </section>
    </article>
  );
}
