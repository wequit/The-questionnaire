interface OtherOptionProps {
  questionId: number;
  isSelected: boolean;
  onOptionChange: (questionId: number, optionId: string) => void;
  customAnswer: string;
  setCustomAnswer: (value: string) => void;
}

export default function OtherOption({
  questionId,
  isSelected,
  onOptionChange,
  customAnswer,
  setCustomAnswer,
}: OtherOptionProps) {
  const handleCustomAnswerChange = (value: string) => {
    setCustomAnswer(value);
    localStorage.setItem(`${questionId}_custom`, value);
    if (!isSelected) {
      onOptionChange(questionId, "custom");
    }
  };

  return (
    <div className="flex items-start mb-2 mt-2">
      <input
        id={`custom-option-${questionId}`}
        name={`question-${questionId}`}
        type="radio"
        className="h-5 w-5 text-blue-600 flex-shrink-0"
        onChange={() => onOptionChange(questionId, "custom")}
        checked={isSelected}
      />
      <label
        htmlFor={`custom-option-${questionId}`}
        className="ml-3 text-gray-900 leading-5"
      >
        Другое:
      </label>
      {isSelected && (
        <div className="ml-3 flex items-center gap-3 w-full">
          <div className="flex relative w-full">
            <input
              type="text"
              value={customAnswer}
              onChange={(e) => handleCustomAnswerChange(e.target.value)}
              className="w-full border-0 border-b border-gray-300 px-3 shadow-none focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-300"
              placeholder="Введите ваш ответ"
            />
            {customAnswer && (
              <button
                type="button"
                onClick={() => {
                  setCustomAnswer(""); 
                  localStorage.removeItem(`${questionId}_custom`); 
                }}
                className="absolute right-3 text-gray-400 hover:text-red-500 transition duration-300"
                title="Очистить"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
