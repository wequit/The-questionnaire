import { useState } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOption from "@/lib/utils/OtherOption";
import { useLanguage } from "@/lib/utils/LanguageContext";

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

export default function Question_One({ questions }: Question_One_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 1);

  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "1",
  });

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question?.id}_custom`) || ""
      : ""
  );

  if (!question) {
    return <div>Loading...</div>;
  }

  const otherOptionIndex = question.options.findIndex(
    (option) => option.text_ru === "Другое:"
  );
  const otherOption =
    otherOptionIndex !== -1 ? question.options[otherOptionIndex] : null;
  const filteredOptions = question.options.filter(
    (_, index) => index !== otherOptionIndex
  );

  const handleOptionChangeWrapper = (questionId: number, optionId: string) => {
    handleOptionChange(optionId) ;
    if (optionId !== "custom") {
      localStorage.removeItem(`${questionId}_custom`);
      setCustomAnswer("");
    }
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6 P-420">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{questionText}</h2>
      <div className="text-gray-700">
        {/* Отображаем только фильтрованные опции */}
        {filteredOptions.map((option: Option) => (
          <div key={option.id} className="flex items-start mb-2">
            <input
              id={`option-${option.id}`}
              name={`question-${question.id}`}
              type="radio"
              className="h-5 w-5 text-blue-600 flex-shrink-0"
              onChange={() => handleOptionChangeWrapper(question.id, option.id.toString())}
              checked={selectedOption === option.id.toString()}
            />
            <label
              htmlFor={`option-${option.id}`}
              className="ml-3 text-gray-900 leading-5"
            >
              {optionText(option)}
            </label>
          </div>
        ))}

        {/* Добавляем компонент для "Другое:" */}
        {otherOption && (
          <OtherOption
            questionId={question.id}
            isSelected={selectedOption === "custom"}
            onOptionChange={handleOptionChangeWrapper}
            customAnswer={customAnswer}
            setCustomAnswer={setCustomAnswer}
          />
        )}
      </div>
    </section>
  );
}
