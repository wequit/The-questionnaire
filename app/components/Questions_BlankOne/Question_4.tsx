import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import OtherOption from "@/lib/utils/OtherOption";
import { useState } from "react";
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

interface Question_Four_Props {
  questions: Question[];
}

export default function Question_Four({ questions }: Question_Four_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 4);
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "4",
  });

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question?.id}_custom`) || ""
      : ""
  );

  if (!question) {
    return <div>Вопрос не найден</div>;
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
    handleOptionChange(optionId.toString());
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
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">
          {questionText}
        </h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">
          {/* Перебор вариантов из options */}
          {filteredOptions.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2 mt-4">
              {/* Для опций с текстом "Такыр жеткиликтүү эмес" и "Толук жеткиликтүү" используем ��екст */}
              {optionText(option) === "Такыр жеткиликтүү эмес" ||
              optionText(option) === "Толук жеткиликтүү" ? (
                <p className="text-gray-700">{optionText(option)}</p>
              ) : (
                <div className="flex items-center">
                  <input
                    id={option.id.toString()}
                    name="QuestionFour"
                    type="radio"
                    className="h-5 w-5 RadioSize text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                    onChange={() =>
                      handleOptionChangeWrapper(
                        question.id,
                        option.id.toString()
                      )
                    }
                    checked={selectedOption === option.id.toString()}
                  />
                  <label
                    htmlFor={`option-${option.id}`}
                    className="ml-3 block text-gray-700"
                  >
                    {optionText(option)}
                  </label>
                </div>
              )}
            </div>
          ))}
          <div className="mt-4">
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
        </div>
      </div>
    </section>
  );
}
