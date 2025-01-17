import { useState, useEffect } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOptionCheckBox from "@/lib/utils/OtherOption_CheckBox";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useValidate } from "../Hooks/useValidate";
import { CgDanger } from "react-icons/cg";
import { useAnswerContext } from "@/lib/utils/AnswerContext";

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

interface Question_Sixteen_Props {
  questions: Question[];
}

export default function Question_Sixteen({
  questions,
}: Question_Sixteen_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 16);
  const { setValidError, getValidError } = useAnswerContext();

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { handleOptionChange } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;
  const filteredOptions = question.options.filter(
    (_, index) => index !== otherOptionIndex
  );

  // Инициализация состояния из localStorage
  useEffect(() => {
    const storedOption = localStorage.getItem(question.id.toString());
    const customStoredAnswer = localStorage.getItem(`${question.id}_custom`);

    if (storedOption) {
      setSelectedOptions(storedOption.split(","));
    }
    if (customStoredAnswer) {
      setCustomAnswer(customStoredAnswer);
    }
  }, [question.id]);

  const handleCheckboxChange = (optionId: string, questionId: number) => {
    const updatedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(updatedOptions);
    handleOptionChange(updatedOptions.join(","));
    updateAnsweredStatus(questionId, true);

    // Сохраняем в localStorage
    localStorage.setItem(questionId.toString(), updatedOptions.join(","));
    if (optionId === "custom") {
      localStorage.setItem(`${questionId}_custom`, customAnswer);
      if (customAnswer.trim() === "") {
        updateAnsweredStatus(questionId, false);
      } else {
        updateAnsweredStatus(questionId, true);
      }
    }
  };

  const handleCustomAnswerChange = (newAnswer: string) => {
    setCustomAnswer(newAnswer);
    localStorage.setItem(`${question.id}_custom`, newAnswer);
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  const isError =
    (!selectedOptions.length ||
      (selectedOptions.includes("custom") && !customAnswer.trim())) &&
    getValidError(question.id);

  return (
    <section
      id={`question-${question.id}`}
      className="p-10 Padding"
      data-question-answered="true"
    >
      <h2 className="text-lg font-semibold font-inter text-gray-900 mb-6 ContainerQuestion">
        {questionText}
      </h2>
      <div className="text-gray-700 font-inter">
        {filteredOptions.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-4">
            <label
              htmlFor={`option-${option.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`option-${option.id}`}
                name={`question-${question.id}`}
                type="checkbox"
                className="hidden peer"
                onChange={() =>
                  handleCheckboxChange(option.id.toString(), question.id)
                }
                checked={selectedOptions.includes(option.id.toString())}
              />
              <div className="w-9 h-9 ContainerRadio border-2 border-gray-300 rounded flex items-center justify-center relative 
              peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
                {selectedOptions.includes(option.id.toString()) && (
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
          <OtherOptionCheckBox
            questionId={question.id}
            isSelected={selectedOptions.includes("custom")}
            onOptionChange={() => handleCheckboxChange("custom", question.id)}
            customAnswer={customAnswer}
            setCustomAnswer={handleCustomAnswerChange}
            language={language}
          />
        )}
      </div>

      {isError && (
        <div className="text-red-600 flex items-center">
          <CgDanger className="w-7 h-7 NecessarilySvg" />
          <h2 className="ml-3 NecessarilyText">
            {language === "ru"
              ? selectedOptions.includes("custom") && !customAnswer.trim()
                ? "Пожалуйста, заполните поле для текста."
                : "Это обязательный вопрос."
              : selectedOptions.includes("custom") && !customAnswer.trim()
              ? "Сураныч, текст талаасын толтуруңуз."
              : "Бул милдеттүү суроо."}
          </h2>
        </div>
      )}
    </section>
  );
}
