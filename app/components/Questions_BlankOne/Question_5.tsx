import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";

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
  options: Option[];
}

interface Question_Five_Props {
  questions: Question[];
}

export default function Question_Five({ questions }: Question_Five_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 5);
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "5",
  });

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  const handleChange = (optionId: number) => {
    handleOptionChange(optionId.toString());
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
      return 'border-gray-300';
    }
    return 'border-green-600';
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6 P-420">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">
          {questionText}
        </h2>

        <div className="flex items-center justify-between gap-4 text-gray-700 textSizeOptions mt-8">
          <span className="text-sm text-gray-600">
            {optionText(question.options[0])}
          </span>

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
                    onChange={() => handleChange(option.id)}
                    checked={selectedOption === option.id.toString()}
                  />
                </label>
              ))}
          </div>

          <span className="text-sm text-gray-600">
            {optionText(question.options[question.options.length - 1])}
          </span>
        </div>
      </div>
    </section>
  );
}
