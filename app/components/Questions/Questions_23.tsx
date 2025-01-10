import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { useState, useEffect, useRef } from "react";

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

  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  const [customAnswer, setCustomAnswer] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Проверка, чтобы текст из localStorage был загружен в textarea
    const savedCustomAnswer = localStorage.getItem(`${question.id}_custom`);
    if (savedCustomAnswer) {
      setCustomAnswer(savedCustomAnswer);
    }
  }, []);

  useEffect(() => {
    // Автоматическая настройка высоты textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Обновляем атрибут data-question-answered на основе наличия текста в customAnswer
    const questionElement = document.getElementById(`question-${question?.id}`);
    if (questionElement) {
      questionElement.setAttribute(
        "data-question-answered",
        customAnswer ? "true" : "false"
      );
    }
  }, [customAnswer]);

  const questionText = language === "ru" ? question.text_ru : question.text_kg;

  const handleInputChange = (value: string) => {
    setCustomAnswer(value);
    // Сохраняем введенный ответ в localStorage
    localStorage.setItem(`${question.id}_custom`, value);
    // Устанавливаем custom в выбранный вариант
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
          className="w-full Placeholder border-0 border-b-2 border-gray-300 px-3 py-2 shadow-none outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out resize-none"
          placeholder="Введите ваш ответ"
          rows={1}
        />
      </div>
    </section>
  );
}
