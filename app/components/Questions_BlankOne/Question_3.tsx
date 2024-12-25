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

interface Question_Three_Props {
  questions: Question[];
}

export default function Question_Three({ questions }: Question_Three_Props) {
  const question = questions.find((q) => q.id === 3); // Предположим, что это первый вопрос
 
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: `${question?.id}`, // Используем id вопроса как ключ
  });

  if (!question) {
    return <div>Loading...</div>;
  }

  const handleChange = (questionId: number, optionId: number) => {
    handleOptionChange(questionId, optionId.toString()); // Передаем ID вопроса и ответа
  };
  
  return (
    <section className="p-6 P-420">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{question.text}</h2>
      <div className="text-gray-700">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
             id={`option-${option.id}`}
              name="Question_Three"
              type="radio"
              className="h-5 w-5 text-blue-600"
              onChange={() =>  handleChange(question.id, option.id)}
              checked={selectedOption === option.id.toString()}
            />
            <label htmlFor={option.id.toString()} className="ml-3">
              {option.text}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
