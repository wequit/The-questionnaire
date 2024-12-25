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

interface Question_Four_Props {
  questions: Question[];
}

export default function Question_Four({ questions }: Question_Four_Props) {
  const question = questions.find((q) => q.id === 4);
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: `${question?.id}`, 
  });

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  const handleChange = (questionId: number, optionId: number ) => {
    handleOptionChange(questionId, optionId.toString());  
  };
  
  return (
    <section className="p-6 P-420">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">

          {/* Перебор вариантов из options */}
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center mb-2 mt-4">
              {/* Для опций с текстом "Такыр жеткиликтүү эмес" и "Толук жеткиликтүү" используем текст */}
              {option.text === "Такыр жеткиликтүү эмес" || option.text === "Толук жеткиликтүү" ? (
                <p className=" text-gray-700">{option.text}</p>
              ) : (
                <div className="flex items-center">
                  <input
                    id={option.id.toString()} 
                    name="QuestionFour"
                    type="radio"
                    className="h-5 w-5 RadioSize text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                    onChange={() =>  handleChange(question.id, option.id)} 
                    checked={selectedOption === option.id.toString()}
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
