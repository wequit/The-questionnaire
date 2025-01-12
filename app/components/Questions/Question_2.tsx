import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useValidate } from "../Hooks/useValidate";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { CgDanger } from "react-icons/cg";
import { useEffect } from "react";

interface Option {
  id: number;
  text_ru: string;
  text_kg: string;
}

interface Question {
  id: number;
  is_required: boolean;
  options: Option[];
  text_ru: string;
  text_kg: string;
}

interface Question_Two_Props {
  questions: Question[];
}

export default function Question_Two({ questions }: Question_Two_Props) {
  const { language } = useLanguage();
  const { setValidError, getValidError } = useAnswerContext();
  const question = questions.find((q) => q.id === 2);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const handleChange = (questionId: number, optionId: string) => {
    handleOptionChange(optionId); // Обновляем состояние выбора
    updateAnsweredStatus(questionId, true); // Обновляем статус вопроса
    
    // Сбрасываем ошибку текущего вопроса асинхронно
    if (!selectedOption && getValidError(questionId)) {
      setValidError(questionId, false);
    }
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError = !selectedOption && getValidError(question.id);

  return ( <article className="container responsive min-h-[300px]!important">
    <section
      id={`question-${question.id}`}
      className="p-10 P-420 Padding"
      data-question-answered={selectedOption ? "true" : "false"}
    >
      <h2 className="text-lg font-bold font-inter text-gray-900 mb-6 ContainerQuestion">
        {questionText}
        {question.id === 2 && question.is_required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </h2>
      <div className="text-gray-700 font-inter">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-4">
            <label
              htmlFor={`option-${option.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`option-${option.id}`}
                name="Question_Two"
                type="radio"
                className="hidden peer"
                onChange={() => {
                  handleChange(question.id, option.id.toString());
                }}
                checked={selectedOption === option.id.toString()}
              />
              {/* Кастомная радиокнопка */}
              <div className="w-7 h-7 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative 
              peer-checked:border-emerald-500   peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
                {/* Галочка появляется, если радиокнопка активна */}
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
          <CgDanger className="w-7 h-7" />
          <h2 className="ml-3"> {language === "ru" ? "Это обязательный вопрос." : "Бул милдеттүү суроо."}</h2>
        </div>
      )}
    </section></article>
  );
}
