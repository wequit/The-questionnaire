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

interface Question_Three_Props {
  questions: Question[];
}

export default function Question_Three({ questions }: Question_Three_Props) {
  const { language } = useLanguage();
  const question = questions.find((q) => q.id === 3); // Предположим, что это первый вопрос

  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: '3'
  });

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleChange = ( optionId: number) => {
    handleOptionChange( optionId.toString()); // Передаем ID вопроса и ответа
  };

  const questionText = language === "ru" ? question.text_ru : question.text_kg;
  const optionText = (option: Option) =>
    language === "ru" ? option.text_ru : option.text_kg;

  return (
    <section className="p-6 P-420">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{questionText}</h2>
      <div className="text-gray-700">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
              id={`option-${option.id}`}
              name="Question_Three"
              type="radio"
              className="h-5 w-5 text-blue-600"
              onChange={() => handleChange(option.id)}
              checked={selectedOption === option.id.toString()}
            />
            <label htmlFor={option.id.toString()} className="ml-3">
            {optionText(option)}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
