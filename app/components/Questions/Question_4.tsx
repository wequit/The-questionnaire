import { useState } from "react";
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

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question?.id}_custom`) || ""
      : ""
  );

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;
  const filteredOptions = question.options.filter(
    (_, index) => index !== otherOptionIndex
  );

  const handleChange = (questionId: number, optionId: string) => {
    if (optionId === "custom") {
      handleOptionChange(optionId);
      updateAnsweredStatus(questionId, true);
      requestAnimationFrame(() => {
        setValidError(questionId, false);
      });
    } else {
      handleOptionChange(optionId);
      updateAnsweredStatus(questionId, true);
      requestAnimationFrame(() => {
        setValidError(questionId, false);
      });
    }
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError = !selectedOption && getValidError(question.id);

  return (
    <section
      id={`question-${question.id}`}
      className="p-10 Padding"
      data-question-answered={selectedOption ? "true" : "false"}
    >
      <h2 className="text-lg font-bold font-inter text-gray-900 mb-6 ContainerQuestion">
        {questionText}
      </h2>
      <div className="text-gray-700">
        {/* Отображаем только фильтрованные опции */}
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
                onChange={() => handleChange(question.id, option.id.toString())}
                checked={selectedOption === option.id.toString()}
              />
              {/* Кастомная радиокнопка */}
              <div className="w-7 h-7 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-blue-100 peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-sky-700 transition-all duration-300 ease-in-out">
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

        {/* Добавляем компонент для "Другое:" */}
        {otherOption && (
          <OtherOption
            questionId={question.id}
            isSelected={selectedOption === "custom"}
            onOptionChange={handleChange}
            customAnswer={customAnswer}
            setCustomAnswer={setCustomAnswer}
            language={language}
          />
        )}
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
