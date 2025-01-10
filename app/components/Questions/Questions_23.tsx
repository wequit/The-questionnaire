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

  const [customAnswer, setCustomAnswer] = useState<string>(
    selectedOption === "custom"
      ? localStorage.getItem(`${question.id}_custom`) || ""
      : ""
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Автоматическая настройка высоты textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Обновляем статус ответа
    updateAnsweredStatus(question.id, true); // Вопрос всегда "отвечен", т.к. он необязательный
  }, [customAnswer, selectedOption]);

  const questionText = language === "ru" ? question.text_ru : question.text_kg;

  const handleInputChange = (value: string) => {
    setCustomAnswer(value);
    localStorage.setItem(`${question.id}_custom`, value); // Сохраняем ответ
    handleOptionChange("custom"); // Устанавливаем "custom" как выбранный вариант
  };

  return (
    <section
      id={`question-${question.id}`}
      className="p-10 Padding"
      data-question-answered="true" // Вопрос всегда считается отвеченным
    >
      <h2 className="text-lg font-bold font-inter text-gray-900 mb-6 ContainerQuestion">{questionText}</h2>
      <div className="text-gray-700">
        <textarea
          ref={textareaRef}
          value={customAnswer}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full Placeholder border-0 border-b-2 border-gray-300 px-3 py-2 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out resize-none"
          placeholder="Введите ваш ответ"
          rows={1}
        />
      </div>
    </section>
  );
}
