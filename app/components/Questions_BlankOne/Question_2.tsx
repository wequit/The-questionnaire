import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useState } from "react";

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
  const question = questions.find((q) => q.id === 2); 
 
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "2",
  });


  if (!question) {
    return <div>Loading...</div>;
  }

  const handleChange = ( optionId: number) => {
    handleOptionChange(optionId.toString());
  };
  
  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;


  return (
    <section className="p-6 P-420">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{questionText}</h2>
      <div className="text-gray-700">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
             id={`option-${option.id}`}
              name="Question_Two"
              type="radio"
              className="h-5 w-5 text-blue-600"
              onChange={() =>  handleChange(option.id)}
              checked={selectedOption === option.id.toString()}
            />
            <label htmlFor={option.id.toString()} className="ml-3">
            {optionText(option)}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
