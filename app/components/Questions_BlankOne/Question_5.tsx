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

  // Функция для вычисления размеров
  const getSize = (index: number, total: number) => {
    const middle = Math.floor(total / 2);
    const distanceFromMiddle = Math.abs(index - middle);
    const size = 8 + distanceFromMiddle * 12; // Увеличение размера (больше, чем раньше)
    return size;
  };

  const getBackgroundColor = (index: number, total: number, isSelected: boolean) => {
    const middle = Math.floor(total / 2);
    if (index < middle) return isSelected ? "bg-red-600" : "bg-red-400";
    if (index === middle) return isSelected ? "bg-gray-500" : "bg-gray-300";
    return isSelected ? "bg-green-600" : "bg-green-400";
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {questionText}
        </h2>

        <div className="flex items-center justify-between gap-4 text-gray-700 mt-8">
          <span className="font-bold text-red-700">
            {optionText(question.options[0])}
          </span>

          <div className="flex items-center gap-6">
            {question.options
              .slice(1, question.options.length - 1) // Убираем первый и последний элементы
              .map((option: Option, index, filteredOptions) => {
                const isSelected = selectedOption === option.id.toString();
                const size = getSize(index, filteredOptions.length); // Получаем размер

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
                      style={{
                        height: `${size}px`,
                        width: `${size}px`,
                      }}
                      className={`${getBackgroundColor(
                        index,
                        filteredOptions.length,
                        isSelected
                      )} border-2 border-transparent rounded-full flex items-center justify-center`}
                    >
                      {isSelected && (
                        <IoIosCheckmark
                          className="text-white"
                          style={{
                            width: `${size / 1.5}px`, // Увеличиваем галочку
                            height: `${size / 1.5}px`, // Увеличиваем галочку
                          }}
                        />
                      )}
                    </div>
                  </label>
                );
              })}
          </div>

          <span className="text-green-600 font-bold">
            {optionText(question.options[question.options.length - 1])}
          </span>
        </div>
      </div>
    </section>
  );
}
