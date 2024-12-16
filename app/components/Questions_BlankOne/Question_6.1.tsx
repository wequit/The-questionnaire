"use client";
import { useQuestionCheckboxes } from "@/app/components/Hooks/useCheckboxes";

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
  const { selectedOptions, otherText, handleOptionChange, handleOtherTextChange } = useQuestionCheckboxes({
    localStorageKey: "Question_6_1",
    localStorageOtherKey: "Question_6_1_other",
  });

  const question = questions.find((q) => q.id === 7);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        {/* Заголовок вопроса */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">
          {/* Перебор вариантов из options */}
          {question.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2 mt-4">
              <input
                id={`optionSixOne-${option.id}`}
                name="question_6_1"
                type="checkbox"
                className="h-5 w-5 RadioSize text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                onChange={() => handleOptionChange(option.text)}
                checked={selectedOptions.includes(option.text)} // Проверяем, выбрана ли опция
              />
              <label htmlFor={`optionSixOne-${option.id}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Показываем поле ввода для текста, если выбрано "Другое" */}
      {selectedOptions.includes("Другое:") && (
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
