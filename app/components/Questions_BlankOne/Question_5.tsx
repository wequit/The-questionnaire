import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";

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

  const getSizeStyle = (index: number, total: number) => {
    const middle = Math.floor(total / 2);
    const distanceFromMiddle = Math.abs(index - middle);

    // Для центральной кнопки минимальный размер
    const size = distanceFromMiddle === 0 ? 24 : 32 + distanceFromMiddle * 8;

    return {
      height: `${size}px`,
      width: `${size}px`,
    };
  };

  const getBackgroundColor = (
    index: number,
    total: number,
    isSelected: boolean
  ) => {
    const middle = Math.floor(total / 2);
    if (index < middle) return isSelected ? "bg-red-600" : "border-2 border-red-400 hover:bg-red-600 hover:border-red-500";
    if (index === middle) return isSelected ? "bg-gray-500" : "border-2 border-gray-400 hover:bg-gray-500 hover:border-gray-500";
    return isSelected ? "bg-green-600" : "border-2 border-green-400 hover:bg-green-600 hover:border-green-600";
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{questionText}</h2>

        <div className="flex items-center justify-between gap-4 text-gray-700 mt-8">
          <span className="text-xs text-center font-bold text-red-600 font-inter uppercase">
            {optionText(question.options[0])}
          </span>

          <div className="flex items-center gap-10">
            {question.options
              .slice(1, question.options.length - 1) // Убираем первый и последний элементы
              .map((option: Option, index, filteredOptions) => {
                const isSelected = selectedOption === option.id.toString();
                return (
                  <label
                    key={option.id}
                    htmlFor={`optionFive-${option.id}`}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110`}
                  >
                    <input
                      id={`optionFive-${option.id}`}
                      name="question_5"
                      type="radio"
                      className="hidden"
                      onChange={() => handleChange(option.id)}
                      checked={isSelected}
                    />
                    <div
                      className={`${getBackgroundColor(
                        index,
                        filteredOptions.length,
                        isSelected
                      )} border-2 border-transparent rounded-full flex items-center justify-center transition-all duration-300 ease-in-out `}
                      style={getSizeStyle(index, filteredOptions.length)} // Применяем динамические размеры
                    >
                      {isSelected || (
                        <IoIosCheckmark className="text-white w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      )}
                      {isSelected && (
                        <IoIosCheckmark className="text-white w-6 h-6" />
                      )}
                    </div>
                  </label>
                );
              })}
          </div>

          <span className="text-xs text-center font-bold text-green-600 font-inter uppercase">
            {optionText(question.options[question.options.length - 1])}
          </span>
        </div>
      </div>
    </section>
  );
}
