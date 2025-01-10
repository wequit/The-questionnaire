"use client";
import { useCallback, useState } from "react";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_One from "@/app/components/Questions/Question_1";
import "@/lib/utils/responsive.css";
import Question_Two from "@/app/components/Questions/Question_2";
import Question_Two_Three from "@/app/components/Questions/Question_3";
// import Question_Four from "@/app/components/Questions/Question_4";
import Question_Five from "../../components/Questions/Question_5";
import Question_Six from "@/app/components/Questions/Question_6";
import Question_Seven from "@/app/components/Questions/Question_7";
import Question_Eight from "@/app/components/Questions/Question_8";
import Question_Nine from "@/app/components/Questions/Question_9";
import Question_Ten from "@/app/components/Questions/Question_10";
import Question_Eleven from "@/app/components/Questions/Questions_11";
import Question_Twelve from "@/app/components/Questions/Questions_12";
import Question_Thirteen from "@/app/components/Questions/Questions_13";
import Question_Fourteen from "@/app/components/Questions/Questions_14";
import Question_Fiveteen from "@/app/components/Questions/Questions_15";
import Question_Sixteen from "@/app/components/Questions/Questions_16";
import Question_Seventeen from "@/app/components/Questions/Questions_17";
import Question_Eighteen from "@/app/components/Questions/Questions_18";
import Question_Nineteen from "@/app/components/Questions/Questions_19";
import Question_Twenty from "@/app/components/Questions/Questions_20";
import Question_TwentyOne from "@/app/components/Questions/Questions_21";
import Question_TwentyTwo from "@/app/components/Questions/Questions_22";
import Question_TwentyThree from "@/app/components/Questions/Questions_23";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import Question_Four from "@/app/components/Questions/Question_4";

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

interface Survey {
  title_ru: string;
  title_kg: string;
  description_ru: string;
  description_kg: string;
  questions: Question[];
}

export default function BlankOne() {
  const { questions, setQuestions } = useAnswerContext();

  const handleFetchSurvey = useCallback((survey: { questions: Question[] }) => {
    setQuestions(survey.questions); // Сохраняем вопросы в контекст
  }, [setQuestions]);

  const fingerprint = getOrCreateFingerprint();
  const hasCompletedSurvey = fingerprint.status === "completed";

  return (
    <div>
      {/* Фетчинг данных */}
      <QuestionsFetcher onFetch={handleFetchSurvey} />

      {hasCompletedSurvey ? (
        ''
      ) : (
        <div className="flex justify-center items-center flex-col w-full col-span-2">
          {questions.length === 0 ? (
            <p>Вопросы загружаются...</p>
          ) : (
            questions.map((question, index) => (
              <article
                key={question.id}
                className="container responsive min-h-[300px]!important"
              >
                {index === 0 && <Question_One questions={questions} />}
                {index === 1 && <Question_Two questions={questions} />}
                {index === 2 && <Question_Two_Three questions={questions} />}
                {index === 3 && <Question_Four questions={questions} />}
                {index === 4 && <Question_Five questions={questions} />}
                {/* {index === 5 && <Question_Six questions={questions} />}
                {index === 6 && <Question_Seven questions={questions} />}
                {index === 7 && <Question_Eight questions={questions} />}
                {index === 8 && <Question_Nine questions={questions} />}
                {index === 9 && <Question_Ten questions={questions} />}
                {index === 10 && <Question_Eleven questions={questions} />}
                {index === 11 && <Question_Twelve questions={questions} />} */}
                {index === 12 && <Question_Thirteen questions={questions} />}
                {/* {index === 13 && <Question_Fourteen questions={questions} />}
                {index === 14 && <Question_Fiveteen questions={questions} />} */}
                {index === 15 && <Question_Sixteen questions={questions} />}
                {/* {index === 16 && <Question_Seventeen questions={questions} />} */}
                {/* {index === 17 && <Question_Eighteen questions={questions} />}
                {index === 18 && <Question_Nineteen questions={questions} />}
                {index === 19 && <Question_Twenty questions={questions} />}
                {index === 20 && <Question_TwentyOne questions={questions} />}
                {index === 21 && <Question_TwentyTwo questions={questions} />} */}
                {index === 22 && <Question_TwentyThree questions={questions} />}
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
