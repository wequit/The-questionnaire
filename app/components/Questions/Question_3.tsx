import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useValidate } from "../Hooks/useValidate";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useState } from "react";

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

interface Question_Three_Props {
  questions: Question[];
}

export default function Question_Three({ questions }: Question_Three_Props) {
  const { language } = useLanguage();
  const { setValidError, getValidError } = useAnswerContext();
  const question = questions.find((q) => q.id === 3);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const handleChange = (questionId: number, optionId: string) => {
    handleOptionChange(optionId);
    updateAnsweredStatus(questionId, true);

    requestAnimationFrame(() => {
      setValidError(questionId, false);
    });
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError = !selectedOption && getValidError(question.id);

  return (
    <section
      id={`question-${question.id}`}
      className="p-10 P-420 Padding"
      data-question-answered={selectedOption ? "true" : "false"}
    >
      <h2 className="text-lg font-bold font-inter text-gray-900 mb-4 ContainerQuestion">
        {questionText}
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
                name="Question_Three"
                type="radio"
                className="hidden peer"
                onChange={() => handleChange(question.id, option.id.toString())}
                checked={selectedOption === option.id.toString()}
              />

              {/* Кастомная радиокнопка */}
              <div className="w-7 h-7 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-200 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
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
          <h2 className="ml-3">Это обязательный вопрос.</h2>
        </div>
      )}
    </section>
  );
}
