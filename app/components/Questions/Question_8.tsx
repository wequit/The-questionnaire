"use client";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  is_required: boolean;
  options: Option[];
}

interface Question_Eight_Props {
  questions: Question[];
}

export default function Question_Eight({ questions }: Question_Eight_Props) {
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: "Question_8",
  });

  // Находим вопрос с id 8
  const question = questions.find((q) => q.id === 9);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        {/* Заголовок вопроса */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8">
          {/* Перебор вариантов */}
          {question.options.map((option: Option, i) => (
            <div key={i} className="flex items-center mb-2 mt-4">
              <input
                id={`optionEight-${option.id}`}
                name="Question_8"
                type="radio"
                className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange(option.text)}
                checked={selectedOption === option.text}
              />
              <label htmlFor={`optionEight-${option.id}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
