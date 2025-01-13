import { useLanguage } from "@/lib/utils/LanguageContext";
import { IoIosCheckmark } from "react-icons/io";
import { useValidate } from "@/app/components/Hooks/useValidate";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { CgDanger } from "react-icons/cg";
import { useEffect, useState, useCallback  } from "react";
import { useQuestionStorage } from "@/app/components/Hooks/useQuestionStorage";

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

interface Questions_Fourteen_TwentyTwo {
  questions: Question[];
}

export default function Questions_Fourteen_TwentyTwo({
  questions,
}: Questions_Fourteen_TwentyTwo) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { language } = useLanguage();
  const { setValidError, getValidError } = useAnswerContext();
  const { updateAnsweredStatus } = useValidate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSizeStyle = useCallback((index: number, total: number) => {
    const middle = Math.floor(total / 2);
    const distanceFromMiddle = Math.abs(index - middle);

    let size = 52 + distanceFromMiddle * 13;

    if (windowWidth <= 768) size = 44 + distanceFromMiddle * 10;
    if (windowWidth <= 600) size = 30 + distanceFromMiddle * 10;
    if (windowWidth <= 455) size = 37 + distanceFromMiddle * 8;
    if (windowWidth <= 405) size = 32 + distanceFromMiddle * 8;
    if (windowWidth <= 374) size = 29 + distanceFromMiddle * 8;

    return {
      height: `${size}px`,
      width: `${size}px`,
    };
  }, [windowWidth]);
  
  const getBackgroundColor = useCallback((index: number, total: number, isSelected: boolean) => {
    const middle = Math.floor(total / 2);
    if (index < middle)
      return isSelected
        ? "bg-red-500 border-red-500"
        : "border-2 border-red-300 hover:bg-red-500 hover:border-red-500";
    if (index === middle)
      return isSelected
        ? "bg-gray-500 border-gray-500"
        : "border-2 border-gray-300 hover:bg-gray-500 hover:border-gray-500";
    return isSelected
      ? "bg-green-500 border-green-500"
      : "border-2 border-green-500 hover:bg-green-500 hover:border-green-500";
  }, []);


  return (
    <>
      {questions.map((question) => {
        const { handleOptionChange, selectedOption } = useQuestionStorage({
          localStorageKey: question.id.toString(),
        });

        const questionText =
          language === "ru" ? question.text_ru : question.text_kg;
        const optionText = (option: Option) =>
          language === "ru" ? option.text_ru : option.text_kg;

        const handleChange = useCallback((questionId: number, optionId: string) => {
          handleOptionChange(optionId);
          updateAnsweredStatus(questionId, true);
          if (!selectedOption) {
            setValidError(questionId, false);
          }
        }, [handleOptionChange, updateAnsweredStatus, setValidError, selectedOption]);

        const isError = !selectedOption && getValidError(question.id);
        const isAnswered = question.id === 8 || question.id === 10 || selectedOption === "true";

        return (
          <article className="container responsive min-h-[300px]!important"  key={question.id}>
            <section
             
              id={`question-${question.id}`}
              className=" p-10 Padding"
              data-question-answered={selectedOption ? "true" : "false"}
            >
              <div className="mb-6">
              <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold font-inter text-gray-900 mb-4 ContainerQuestionEX">
                    {questionText}
                  </h2>
                  {!isAnswered && (
                    <span className="text-red-500 text-2xl font-bold">*</span>
                  )}
                </div>
                <div className="flex items-start justify-between text-gray-700 mt-8 text-center">
                  <span className="text-xs text-start font-bold text-red-600 font-inter uppercase TextRed TextRedWidth">
                    {optionText(question.options[0])}
                  </span>
                  <span className="text-xs text-end font-bold text-green-600 font-inter uppercase TextGreen TextGreenWidth">
                    {optionText(question.options[question.options.length - 1])}
                  </span>
                </div>
                <div className="flex items-center justify-center Gap px-16 mt-4">
                  {question.options
                    .slice(1, question.options.length - 1)
                    .map((option, index, filteredOptions) => {
                      const isSelected =
                        selectedOption === option.id.toString();
                      return (
                        <label
                          key={option.id}
                          htmlFor={`option-${option.id}`}
                          className="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out transform"
                        >
                          <input
                            id={`option-${option.id}`}
                            name={`question_${option.id}`}
                            type="radio"
                            className="hidden"
                            onChange={() =>
                              handleChange(question.id, option.id.toString())
                            }
                            checked={isSelected}
                          />
                          <div
                            className={`${getBackgroundColor(
                              index,
                              filteredOptions.length,
                              isSelected
                            )} border-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out`}
                            style={getSizeStyle(index, filteredOptions.length)}
                          >
                            {isSelected || (
                              <IoIosCheckmark className="text-white w-16 h-16 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            )}
                            {isSelected && (
                              <IoIosCheckmark className="text-white w-16 h-16" />
                            )}
                          </div>
                        </label>
                      );
                    })}
                </div>
              </div>
              {isError && (
                <div className="text-red-600 flex items-center">
                  <CgDanger className="w-7 h-7" />
                  <h2 className="ml-3 Necessarily">{language === "ru" ? "Это обязательный вопрос." : "Бул милдеттүү суроо."}</h2>
                </div>
              )}
            </section>
          </article>
        );
      })}
    </>
  );
}
