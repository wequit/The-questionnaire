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

interface Question_Thirteen_Props {
  questions: Question[];
}

export default function Question_Thirteen({ questions }: Question_Thirteen_Props) {
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: "Question_13",
  });

  // Извлекаем нужный вопрос из массива вопросов
  const question = questions.find((q) => q.id === 15);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">

          {/* Перебор вариантов из options */}
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center mb-2 mt-4">
              {/* Для опций с текстом "Такыр жеткиликтүү эмес" и "Толук жеткиликтүү" используем текст */}
              {option.text === "толугу менен канааттандырган жок//полностью неудовлетворен" || option.text === "толугу менен канааттандырды//полностью удовлетворен" ? (
                <p className=" text-gray-700">{option.text}</p>
              ) : (
                <div className="flex items-center">
                  <input
                    id={`option-${option.id}`} // Уникальный id для каждой радиокнопки
                    name="Question_13"
                    type="radio"
                    className="h-5 w-5 RadioSize text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                    onChange={() => handleOptionChange(option.text)} // Передаем текст опции
                    checked={selectedOption === option.text}
                  />
                  <label htmlFor={`option-${option.id}`} className="ml-3 block text-gray-700">
                    {option.text} {/* отображаем текст из option */}
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
