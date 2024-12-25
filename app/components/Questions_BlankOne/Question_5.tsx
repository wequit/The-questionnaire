import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

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
  answer_options: Option[];
}

interface Question_Five_Props {
  questions: Question[];
  language: "ru" | "kg"; // Укажите текущий язык
}

export default function Question_Five({ questions, language }: Question_Five_Props) {
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: "Question_5",
  });

  // Извлекаем вопрос с id 5 из списка вопросов
  const question = questions.find((q) => q.id === 5);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  const handleChange = (questionId: number, optionId: number) => {
    handleOptionChange(questionId, optionId.toString());
  };

  return (
    <section className="p-6 P-420">
      <div className="mb-6">
        {/* Заголовок вопроса */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">
          {language === "ru" ? question.text_ru : question.text_kg}
        </h2>

        {/* Горизонтальный ряд с радио-кнопками */}
        <div className="flex items-center justify-between gap-4 text-gray-700 textSizeOptions mt-8">
          {/* Левая метка */}
          <span className="text-sm text-gray-600">
            {language === "ru"
              ? question.answer_options[0].text_ru
              : question.answer_options[0].text_kg}
          </span>

          {/* Радио-кнопки (цифры скрыты, но функциональны) */}
          <div className="flex items-center gap-4">
            {question.answer_options
              .filter((_, index) => index > 0 && index < question.answer_options.length - 1) // Берём только средние варианты
              .map((option: Option) => (
                <label
                  key={option.id}
                  htmlFor={`optionFive-${option.id}`}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <input
                    id={`optionFive-${option.id}`}
                    name="question_5"
                    type="radio"
                    className="h-5 w-5 RadioSize text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
                    onChange={() => handleChange(question.id, option.id)}
                    checked={selectedOption === option.id.toString()}
                  />
                </label>
              ))}
          </div>

          {/* Правая метка */}
          <span className="text-sm text-gray-600">
            {language === "ru"
              ? question.answer_options[question.answer_options.length - 1].text_ru
              : question.answer_options[question.answer_options.length - 1].text_kg}
          </span>
        </div>
      </div>
    </section>
  );
}
