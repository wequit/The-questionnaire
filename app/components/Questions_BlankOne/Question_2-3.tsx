import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

// Интерфейс для вопроса и его опций
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

interface Question_Two_Three_Props {
  questions: Question[];
  onAnswerChange: (questionId: number, answer: string) => void;
}

export default function Question_Two_Three({ questions, onAnswerChange }: Question_Two_Three_Props) {
    const { handleOptionChange: handleGenderChange, selectedOption: selectedGender  } = useQuestionStorage({
      localStorageKey: "Question_2",
    });
    const { handleOptionChange: handleAgeChange, selectedOption: selectedAge  } = useQuestionStorage({
      localStorageKey: "Question_3",
    });
    
   

  // Проверяем, что вопросы были загружены
  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const genderQuestion = questions[1]; // Второй вопрос (Жыныс)
  const ageQuestion = questions[2];    // Третий вопрос (Возраст)

  // Проверка на наличие вопросов для половых и возрастных данных
  if (!genderQuestion || !ageQuestion) {
    return <div>Questions are not available.</div>;
  }

  const handleChangeGender = (option: string) => {
    handleGenderChange(option)
    onAnswerChange(genderQuestion.id, option); 
  };

  const handleChangeAge = (option: string) => {
    handleAgeChange(option)
    onAnswerChange(ageQuestion.id, option); 
  };

  return (
    <section className="p-6 P-420">
      {/* Второй вопрос (Жыныс) */}
      <div key={genderQuestion.id} className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{genderQuestion.text}</h2>

        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">
          {genderQuestion.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                id={`gender-${option.id}`}
                name="gender"
                type="radio"
                className="h-5 w-5 RadioSize text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
                onChange={() => handleChangeGender(option.text)}
                checked={selectedGender === option.text}
              />
              <label htmlFor={`gender-${option.id}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Третий вопрос (Возраст) */}
      <div key={ageQuestion.id} className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 textSizeTittle">{ageQuestion.text}</h2>
        <div className="text-gray-700 mb-6 mt-8 textSizeOptions">
          {ageQuestion.options.map((option: Option) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                id={`age-${option.id}`}
                name="age"
                type="radio"
                className="h-5 w-5 RadioSize text-slate-800 focus:ring-blue-500 border-gray-300 rounded-md transition duration-200 ease-in-out"
                onChange={() => handleChangeAge(option.text)}
                checked={selectedAge === option.text}
              />
              <label htmlFor={`age-${option.id}`} className="ml-3 block text-gray-700">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
