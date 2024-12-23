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

interface Question_Twelve_Props {
  questions: Question[];
}

export default function Question_Twelve({ questions }: Question_Twelve_Props) {
  const {  handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: "Question_12",
  });

  const question = questions.find((q) => q.id === 13);

  if (!question) {
    return <div>Вопрос не найден</div>;
  }

  return (
    <section className="p-6 P-515">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{question.text}</h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">
          {question.options.map((option: Option, i) => (
            <div key={i} className="flex items-center mb-2 mt-4">
              <input
                id={`optionSeven-${i}`}
                name="Question_12"
                type="radio"
                className="h-5 w-5 RadioSize InputAnotherSizeBlankTwo text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                onChange={() => handleOptionChange(option.text)}
                checked={selectedOption === option.text} 
              />
              <label htmlFor={`optionSeven-${i}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
