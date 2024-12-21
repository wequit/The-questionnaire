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

interface Question_One_Props {
  questions: Question[
  ];
}

export default function Question_One({ questions }: Question_One_Props) {
  const { selectedOption, handleOptionChange } = useQuestionStorage({
    localStorageKey: "Question_1",
  });

  const question = questions.find((q) => q.id === 1);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-6 P-420">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{question.text}</h2>
      <div className="text-gray-700">
        {question.options.map((option: Option) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
              id={option.id.toString()}
              name="Question_One"
              type="radio"
              className="h-5 w-5 text-blue-600"
              onChange={() => handleOptionChange(option.text)}
              checked={selectedOption === option.text}
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