import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { useValidate } from "../Hooks/useValidate";

interface Question {
  id: number;
  is_required: boolean;
  text_ru: string;
  text_kg: string;
}

interface Question_TwentyThree_Props {
  questions: Question[];
}

export default function Question_TwentyThree({ questions }: Question_TwentyThree_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 23);

  if (!question) {
    return <div>Loading...</div>;
  }

  const { updateAnsweredStatus } = useValidate();
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>(selectedOption === "custom" ? localStorage.getItem(`${question.id}_custom`) || "" : "");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    updateAnsweredStatus(question.id, true); 
  }, [customAnswer, selectedOption]);

  const questionText = language === "ru" ? question.text_ru : question.text_kg;

  const handleInputChange = (value: string) => {
    setCustomAnswer(value);
    localStorage.setItem(`${question.id}_custom`, value); 
    handleOptionChange("custom"); 
  };

  return (
    <section
      id={`question-${question.id}`}
      className="p-10 Padding"
      data-question-answered="true"
    >
      <h2 className="text-lg font-bold font-inter text-gray-900 mb-6 ContainerQuestion">{questionText}</h2>
        <div className="text-gray-700">
          <textarea
            ref={textareaRef}
            value={customAnswer}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full Placeholder border-0  px-3 pb-5 shadow-none outline-none focus:ring-0  transition duration-300 ease-in-out resize-none overflow-hidden"
            placeholder={`${language === "ru" ? "Введите ваш текст" : "Жообуңузду киргизиңиз" }`}
            rows={1}
          />
        </div>
    </section>
  );
}
