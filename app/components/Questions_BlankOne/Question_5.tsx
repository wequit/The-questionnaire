import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import '../../../lib/utils/Radio.css'

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

interface Question_Five_Props {
  questions: Question[];
}

export default function Question_Five({ questions }: Question_Five_Props) {
  const question = questions.find((q) => q.id === 5);
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: `${question?.id}`,
  });

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  const handleChange = (questionId: number, optionId: number) => {
    handleOptionChange(questionId, optionId.toString());
  };

  const getSizeClass = (index: number, total: number) => {
    const middle = Math.floor(total / 2); 
    const distanceFromMiddle = Math.abs(index - middle); 
    const size = 7 - distanceFromMiddle; 
    return `h-${size} w-${size}`; 
  };

  const getBorderColor = (index: number) => {
    if (index < 2) {
      return 'border-red-600 '; 
    }
    if (index === 2 || index === 3) {
      return 'border-gray-300'; // Центральная часть
    }
    return 'border-green-600'; // Правая сторона
  };

  return (
    <section className="p-6 P-420">
      <div className="mb-6">
        {/* Заголовок вопроса */}
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">
          {question.text}
        </h2>

        {/* Горизонтальный ряд с радио-кнопками */}
        <div className="flex items-center justify-between gap-4 text-gray-700 textSizeOptions mt-8">
          {/* Левая метка */}
          <span className="text-sm text-gray-600">
            {question.options[0].text}
          </span>

          {/* Радио-кнопки */}
          <div className="flex items-center gap-4">
            {question.options
              .filter((option, index) => index > 0 && index < question.options.length - 1) 
              .map((option: Option, index, filteredOptions) => (
                <label
                  key={option.id}
                  htmlFor={`optionFive-${option.id}`}
                  className={`flex flex-col items-center cursor-pointer ${getBorderColor(index)} border-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110`}
                >
                  <input
                    id={`optionFive-${option.id}`}
                    name="question_5"
                    type="radio"
                    className={`${getSizeClass(index, filteredOptions.length)} RadioSize text-blue-600 focus:ring-0 border-none`}
                    onChange={() => handleChange(question.id, option.id)}
                    checked={selectedOption === option.id.toString()}
                  />
                </label>
              ))}
          </div>

          {/* Правая метка */}
          <span className="text-sm text-gray-600">
            {question.options[question.options.length - 1].text}
          </span>
        </div>
      </div>
    </section>
  );
}
