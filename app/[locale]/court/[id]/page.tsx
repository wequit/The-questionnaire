'use client';
import { useCallback, useMemo } from "react";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_One from "@/app/components/Questions/Question_1";
import Question_Two from "@/app/components/Questions/Question_2";
import Question_Three from "@/app/components/Questions/Question_3";
import Question_Four from "@/app/components/Questions/Question_4";
import Questions_Five_Twelve from "@/app/components/Questions/Questions_Five_Twelve";
import Question_Thirteen from "@/app/components/Questions/Questions_13"; 
import Questions_Fourteen_TwentyTwo from "@/app/components/Questions/Questions_Fourteen_TwentyTwo";
import Question_Sixteen from "@/app/components/Questions/Questions_16"; 
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import "@/lib/utils/responsive.css";
import Question_TwentyThree from "@/app/components/Questions/Questions_23";

interface Question {
  id: number;
  text_ru: string;
  text_kg: string;
  is_required: boolean;
  options: {
    id: number;
    text_ru: string;
    text_kg: string;
  }[];
}

interface Survey {
  questions: Question[];
}

export default function BlankOne() {
  const { questions, setQuestions } = useAnswerContext();

  const handleFetchSurvey = useCallback(
    (survey: Survey) => setQuestions(survey.questions),
    [setQuestions]
  );

  const fingerprint = useMemo(() => getOrCreateFingerprint(), []);
  const hasCompletedSurvey = fingerprint.status === "completed";

  const questions_1_4 = useMemo(() => questions.filter(
    (question) => question.id >= 1 && question.id <= 4
  ), [questions]);
  const questions_5_12 = useMemo(() => questions.filter(
    (question) => question.id >= 5 && question.id <= 12
  ), [questions]);
  const question_13 =  useMemo(() => questions.find(
    (question) => question.id === 13
  ), [questions]);
  const question_16 =  useMemo(() => questions.find(
    (question) => question.id === 16
  ), [questions]);
  const questions_14_15 = useMemo(() => questions.filter(
    (question) => question.id === 14 || question.id === 15
  ), [questions]);
  const questions_17_22 =  useMemo(() => questions.filter(
    (question) => question.id >= 17 && question.id <= 22
  ), [questions]);

  const question_23 = questions.find((question) => question.id === 23);

  
  return (
    <div>
      <QuestionsFetcher onFetch={handleFetchSurvey} /> {/* Загрузка вопросов */}

      {hasCompletedSurvey ? (
        ''
      ) : (
        <div className="flex justify-center items-center flex-col w-full col-span-2">
          {questions.length === 0 ? (
            <p>Вопросы загружаются...</p>
          ) : (
            <>
              {/* Вопросы 1–4 */}
              {questions_1_4.map((question, index) => {
                if (index === 0)
                  return (
                    <Question_One questions={questions_1_4} key={question.id} />
                  );
                if (index === 1)
                  return (
                    <Question_Two questions={questions_1_4} key={question.id} />
                  );
                if (index === 2)
                  return (
                    <Question_Three
                      questions={questions_1_4}
                      key={question.id}
                    />
                  );
                if (index === 3)
                  return (
                    <Question_Four
                      questions={questions_1_4}
                      key={question.id}
                    />
                  );
                return null;
              })}

              {/* Вопросы 5–12 */}
              {questions_5_12.length > 0 && (
                <Questions_Five_Twelve questions={questions_5_12} />
              )}

              {/* Вопрос 13 */}
              {question_13 && (
                <article
                  className="container responsive min-h-[300px]!important"
                  key="question_13"
                >
                  <Question_Thirteen questions={[question_13]} />
                </article>
              )}

              {/* Вопросы 14-15 */}
              {questions_14_15.length > 0 && (
                <Questions_Fourteen_TwentyTwo questions={questions_14_15} />
              )}

              {/* Вопрос 16 */}
              {question_16 && (
                <article
                  className="container responsive min-h-[300px]!important"
                  key="question_16"
                >
                  <Question_Sixteen questions={[question_16]} />
                </article>
              )}

              {/* Вопросы 17-22 */}
              {questions_17_22.length > 0 && (
                <Questions_Fourteen_TwentyTwo questions={questions_17_22} />
              )}
              {question_23 && (
                <article
                  className="container responsive min-h-[300px]!important"
                  key="question_23"
                >
                  <Question_TwentyThree questions={[question_23]} />
                </article>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
