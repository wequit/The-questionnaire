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

interface Question_Seventeen_Props {
  questions: Question[];
}

export default function Question_Seventeen({ questions }: Question_Seventeen_Props) {
  const { language } = useLanguage();
  const { setValidError, getValidError } = useAnswerContext();
  const question = questions.find((q) => q.id === 17);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey:  question.id.toString(),
  });

  const handleChange = (questionId: number, optionId: string) => {
    handleOptionChange(optionId);
    updateAnsweredStatus(questionId, true);
    requestAnimationFrame(() => {
      setValidError(questionId, false);
    });
  };

  const getSizeStyle = (index: number, total: number) => {
    const middle = Math.floor(total / 2);
    const distanceFromMiddle = Math.abs(index - middle);

    const size = distanceFromMiddle === 0 ? 44 : 52 + distanceFromMiddle * 13;

    return {
      height: `${size}px`,
      width: `${size}px`,
    };
  };

  const getBackgroundColor = (
    index: number,
    total: number,
    isSelected: boolean
  ) => {
    const middle = Math.floor(total / 2);
    if (index < middle) return isSelected ? "bg-red-500 border-red-500" : "border-2 border-red-300 hover:bg-red-500 hover:border-red-500";
    if (index === middle) return isSelected ? "bg-gray-500 border-gray-500" : "border-2 border-gray-300 hover:bg-gray-500 hover:border-gray-500";
    return isSelected ? "bg-green-500 border-green-500" : "border-2 border-green-500 hover:bg-green-500 hover:border-green-500";
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError = !selectedOption && getValidError(question.id);

  return (
    <section  id={`question-${question.id}`} className="p-10" data-question-answered={selectedOption ? "true" : "false"}>
      <div className="mb-6">
        <h2 className="text-lg font-bold font-inter text-gray-900 mb-4">{questionText}</h2>

        <div className="flex items-start justify-between text-gray-700 mt-12">
          {/* Первый span слева */}
          <span className="text-xs font-bold text-red-600 font-inter uppercase">
            {optionText(question.options[0])}
          </span>

          {/* Второй span справа */}
          <span className="text-xs font-bold text-green-600 font-inter uppercase">
            {optionText(question.options[question.options.length - 1])}
          </span>
        </div>

        <div className="flex items-center justify-center gap-10 px-16 mt-4">
          {" "}
          {question.options
            .slice(1, question.options.length - 1) 
            .map((option: Option, index, filteredOptions) => {
              const isSelected = selectedOption === option.id.toString();
              return (
                <label
                  key={option.id}
                  htmlFor={`optionSeventeen-${option.id}`}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out transform`}
                >
                  <input
                    id={`optionSeventeen-${option.id}`}
                    name={`question_${option.id}`}
                    type="radio"
                    className="hidden"
                    onChange={() => handleChange(question.id, option.id.toString())}
                    checked={isSelected}
                  />
                  <div
                    className={`${getBackgroundColor(
                      index,
                      filteredOptions.length,
                      isSelected
                    )} border-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out`}
                    style={getSizeStyle(index, filteredOptions.length)}
                  >
                    {isSelected || (
                      <IoIosCheckmark className="text-white w-16 h-16 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    )}
                    {isSelected && (
                      <IoIosCheckmark className="text-white w-16 h-16" />
                    )}
                  </div>
                </label>
              );
            })}
        </div>
      </div>
      {isError && (
        <div className="text-red-600 flex items-center">
          <CgDanger className="w-7 h-7" />
          <h2 className="ml-3">Это обязательный вопрос.</h2>
        </div>
      )}
    </section>
  );
}
