import React, { useEffect, useState } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOption from "@/lib/utils/OtherOption";
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

interface Question_One_Props {
  questions: Question[];
}


export default function Question_One({}: Question_One_Props) {
  const { language } = useLanguage();
  const { questions } = useAnswerContext();
  const { setValidError, getValidError } = useAnswerContext();
  const question = questions.find((q) => q.id === 1);

  if (!question) {
    return <div>Loading...</div>;
  }

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;

  const filteredOptions = question.options
    .filter((_, index) => index !== otherOptionIndex)
    .sort((a, b) => {
      if (a.id <= 6 && b.id <= 6) {
        return a.id - b.id;
      }
      if (a.id <= 6) {
        return -1;
      }
      if (b.id <= 6) {
        return 1;
      }
      return a.id - b.id;
    });

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>("");

  useEffect(() => {
    if (selectedOption === otherOption?.id.toString()) {
      const storedCustomAnswer =
        localStorage.getItem(`${question.id}_custom`) || "";
      setCustomAnswer(storedCustomAnswer);
    }
  }, [selectedOption, question.id]);


  const handleChange = (questionId: number, optionId: string) => {
    if (optionId === otherOption?.id.toString()) { 
      if (customAnswer.trim() === "") {
        updateAnsweredStatus(questionId, false);
      } else {
        updateAnsweredStatus(questionId, true);
      }
      handleOptionChange(optionId); 
    } else {
      handleOptionChange(optionId);
      updateAnsweredStatus(questionId, true);
    }
  
    if (selectedOption && getValidError(questionId)) {
      setValidError(questionId, false);
    }
  
    localStorage.setItem(questionId.toString(), optionId);
    window.dispatchEvent(new Event('localStorageChange'));
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError =
    (!selectedOption ||
      (selectedOption === otherOption?.id.toString() && !customAnswer.trim())) &&
    getValidError(question.id);

  return (
    <article className="container responsive min-h-[300px]!important">
      <section
        className="p-10 Padding"
        id={`question-${question.id}`}
        data-question-answered="true"
      >
        <h2 className="text-lg font-semibold font-inter text-gray-900 mb-2 ContainerQuestion">
          {questionText}
        </h2>
       
        <div className="text-gray-700 mt-4 font-inter">
          {filteredOptions.map((option: Option) => (
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
                <div className="w-9 h-9  flex-shrink-0 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative
                 peer-checked:border-emerald-500   peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
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

          {otherOption && (
            <OtherOption
              questionId={question.id}
              isSelected={selectedOption === otherOption?.id.toString()}
              onOptionChange={handleChange}
              customAnswer={customAnswer}
              setCustomAnswer={setCustomAnswer}
              language={language}
              otherOptionId={otherOption?.id.toString()}
            />
          )}
        </div>
        {isError && (
          <div className="text-red-600 flex items-center">
            <CgDanger className="w-7 h-7 NecessarilySvg" />
            <h2 className="ml-3 NecessarilyText">
              {language === "ru"
                ? selectedOption === otherOption?.id.toString() && !customAnswer.trim()
                  ? "Пожалуйста, заполните поле для текста."
                  : "Это обязательный вопрос."
                : selectedOption === otherOption?.id.toString() && !customAnswer.trim()
                  ? "Сураныч, текст талаасын толтуруңуз."
                  : "Бул милдеттүү суроо."}
            </h2>
          </div>
        )}
      </section>
    </article>
  );
}

