"use client";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

// Интерфейсы для вопроса и его опций
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

interface Question_One_Props {
  questions: Question[];
}

export default function Question_One({ questions }: Question_One_Props) {
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: "Question_1",
  });

  const question = questions.find((q) => q.id === 1); // Находим нужный вопрос (например, с id = 1)

  if (!question) {
    return <div>Loading...</div>; // Если вопрос еще не загружен, показываем "Loading..."
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
          
        <div className="text-gray-700 textSizeOptions">
          {question.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                id={option.id.toString()}
                name="Question_One"
                type="radio"
                className="h-5 w-5 text-blue-600 RadioSize focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange(option.text)}
                checked={selectedOption === option.text}
              />
              <label htmlFor={option.id.toString()} className="ml-3 block text-gray-700 w-full">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}