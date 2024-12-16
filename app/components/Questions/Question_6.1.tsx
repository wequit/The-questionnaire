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

interface Question_Six_One_Props {
  questions: Question[];
}

export default function Question_Six_One({ questions }: Question_Six_One_Props) {
  const { otherText, selectedOption_6_1, handleOptionChange_6_1, handleOtherTextChange } = useQuestionStorage({
    localStorageKey: "Question_6_1",
  }); 

  // Находим вопрос с id 6.1
  const question = questions.find((q) => q.id === 7);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        {/* Заголовок вопроса */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8">
          {/* Перебор вариантов из options */}
          {question.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2 mt-4">
              <input
                id={`optionSixOne-${option.id}`}
                name="question_6_1"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange_6_1(option.text)}
                checked={selectedOption_6_1.includes(option.text)} // Проверяем, выбрана ли опция
              />
              <label htmlFor={`optionSixOne-${option.id}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>
      {selectedOption_6_1.includes("Другое:") && (
        <div className="mt-4 transition-all duration-300">
          <input
            type="text"
            value={otherText}
            onChange={handleOtherTextChange}
            className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 text-gray-700 outline-none transition-all duration-300"
            placeholder="Введите ваш ответ..."
          />
        </div>
      )}

    </section>
  );
}
