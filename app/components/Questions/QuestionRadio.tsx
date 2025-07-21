import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";
import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { CgDanger } from "react-icons/cg";
import React, { useState, useEffect } from "react";

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

interface Props {
  question: Question;
  displayNumber: number;
  error?: number[];
  requiredIds: number[];
}

const TEXT_INPUT_QUESTIONS = [6, 13, 20];

const getQuestionTextWithoutNumber = (text: string) => {
  return text.replace(/^\d+\.\s*/, "");
};

const QuestionRadio: React.FC<Props> = ({ question, displayNumber, error, requiredIds }) => {
  const { language } = useLanguage();
  const { setValidError, getValidError, getAnswer, setAnswer } = useAnswerContext();
  const { handleOptionChange, selectedOption } = useQuestionStorage({
    localStorageKey: question.id.toString(),
  });

  // Для textarea (6, 13, 20) используем только getAnswer/setAnswer
  const textValue = getAnswer(`${question.id}_text`) || "";
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(`${question.id}_text`, e.target.value);
    if (getValidError(question.id)) setValidError(question.id, false);
  };

  const [otherValue, setOtherValue] = useState(getAnswer(`${question.id}_custom`) || "");
  useEffect(() => {
    setOtherValue(getAnswer(`${question.id}_custom`) || "");
  }, [getAnswer, question.id]);
  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
    setAnswer(`${question.id}_custom`, e.target.value);
  };

  const questionTextRaw = language === "ru" ? question?.text_ru || "" : question?.text_kg || "";
  const questionText = getQuestionTextWithoutNumber(questionTextRaw);
  const optionText = (option: Option) =>
    language === "ru" ? option?.text_ru || "" : option?.text_kg || "";

  const isError = Array.isArray(error) && error.includes(question.id);

  return (
    <article className="container responsive min-h-[300px]!important">
      <section
        className="p-10 Padding"
        id={`question-${question.id}`}
        data-question-answered={
          ([13, 20].includes(question.id))
            ? "true"
            : TEXT_INPUT_QUESTIONS.includes(question.id)
              ? (!!textValue.trim()).toString()
              : (selectedOption ? "true" : "false")
        }
      >
        <div className="flex items-start justify-between mb-2 ContainerQuestion">
          <h2 className="text-lg font-semibold font-inter text-gray-900">
            {displayNumber}. {questionText}
          </h2>
          {requiredIds.includes(question.id) && (
            <span
              style={{
                color: 'red',
                fontSize: '2em',
                fontWeight: 'bold',
                verticalAlign: 'middle',
                pointerEvents: 'none',
                userSelect: 'none',
                marginLeft: 8,
              }}
              title="Обязательный вопрос"
            >
              *
            </span>
          )}
        </div>
        <div className="text-gray-700 mt-4 font-inter">
          {TEXT_INPUT_QUESTIONS.includes(question.id) ? (
            <textarea
              className="w-full min-h-[100px] border rounded p-2"
              value={textValue}
              onChange={handleTextChange}
              placeholder={
                language === "ru"
                  ? "Введите ваш комментарий..."
                  : "Комментарий жазыңыз..."
              }
            />
          ) : (
            question.options.map((option) => {
              const isOther =
                (language === "ru" && option.text_ru?.toLowerCase().includes("другое")) ||
                (language === "kg" && option.text_kg?.toLowerCase().includes("башка"));
              const isSelected = selectedOption === option.id.toString();
              return (
                <div key={option.id} className="flex items-center mb-4">
                  <label
                    htmlFor={`option-${option.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      id={`option-${option.id}`}
                      name={`question-${question.id}`}
                      type="radio"
                      className="hidden peer"
                      onChange={() => handleOptionChange(option.id.toString())}
                      checked={isSelected}
                    />
                    <div className="w-9 h-9 flex-shrink-0 ContainerRadio border-2 border-gray-300 rounded-full flex items-center justify-center relative peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all duration-300 ease-in-out">
                      {isSelected && (
                        <IoIosCheckmark className="text-white w-6 h-6" />
                      )}
                    </div>
                    <span className="ml-4 text-lg text-gray-900 ContainerOptionText">
                      {optionText(option)}
                    </span>
                    {isOther && isSelected && (
                      <input
                        type="text"
                        className="ml-4 border-b-2 border-gray-300 px-3 py-1"
                        value={otherValue}
                        onChange={handleOtherChange}
                        placeholder={
                          language === "ru"
                            ? "Введите ваш ответ"
                            : "Жообуңузду киргизиңиз"
                        }
                      />
                    )}
                  </label>
                </div>
              );
            })
          )}
        </div>
        {isError && (
          <div className="text-red-600 flex items-center">
            <CgDanger className="w-7 h-7 NecessarilySvg" />
            <h2 className="ml-3 NecessarilyText">
              {language === "ru"
                ? "Пожалуйста, выберите ответ."
                : "Сураныч, жооп тандаңыз."}
            </h2>
          </div>
        )}
      </section>
    </article>
  );
};

export default QuestionRadio; 