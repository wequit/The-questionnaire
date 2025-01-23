'use client';
import { useCallback, useMemo, useState, useEffect } from "react";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_One from "@/app/components/Questions/Question_1";
import Question_Two from "@/app/components/Questions/Question_2";
import Question_Three from "@/app/components/Questions/Question_3";
import Question_Four from "@/app/components/Questions/Question_4";
import Question_Thirteen from "@/app/components/Questions/Questions_13"; 
import Question_Sixteen from "@/app/components/Questions/Questions_16"; 
import Question_Fiveteen from "@/app/components/Questions/Questions_15"; 
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import "@/lib/utils/responsive.css";
import Question_Five from "@/app/components/Questions/Question_5";
import Questions_Six_Twelve from "@/app/components/Questions/Questions_Six_Twelve";
import Question_Eighteen from "@/app/components/Questions/Questions_18";
import Question_Fourteen from "@/app/components/Questions/Questions_14";
import Questions_Seventeen from "@/app/components/Questions/Questions_17";
import React from "react";

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
  const [showQuestion13, setShowQuestion13] = useState<boolean>(() => 
    localStorage.getItem("5") === "20"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const answer = localStorage.getItem("5");
      setShowQuestion13(answer === "20");
    };

    window.addEventListener('storage', handleStorageChange);
    
    const observer = new MutationObserver(() => {
      const answer = localStorage.getItem("5");
      setShowQuestion13(answer === "20");
    });

    observer.observe(document.body, { 
      subtree: true, 
      childList: true 
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  const fingerprint = useMemo(() => getOrCreateFingerprint(), []);
  const hasCompletedSurvey = fingerprint.status === "completed";

  const questions_1_5 = useMemo(() => {
    const filteredQuestions = questions.filter(
      (question) => question.id >= 1 && question.id <= 5
    );
    return filteredQuestions.sort((a, b) => a.id - b.id);
  }, [questions]);

  const questions_6_12 = useMemo(() => {
    const filteredQuestions = questions.filter(
      (question) => question.id >= 6 && question.id <= 12
    );
    return filteredQuestions.sort((a, b) => a.id - b.id);
  }, [questions]);

  const question_13 = useMemo(() => 
    questions.find((question) => question.id === 13)
  , [questions]);

  const question_14 = useMemo(() => 
    questions.find((question) => question.id === 14)
  , [questions]);

  const question_15 = useMemo(() => 
    questions.find((question) => question.id === 15)
  , [questions]);

  const question_16 = useMemo(() => 
    questions.find((question) => question.id === 16)
  , [questions]);

  const question_17 = useMemo(() => 
    questions.find((question) => question.id === 17)
  , [questions]);

  const question_18 = useMemo(() => 
    questions.find((question) => question.id === 18)
  , [questions]);

  const handleFetchSurvey = useCallback(
    (survey: Survey) => setQuestions(survey.questions),
    [setQuestions]
  );

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
              {/* Вопросы 1-5 */}
              {questions_1_5.map((question) => {
                const key = `question_${question.id}`;
                
                switch(question.id) {
                  case 1:
                    return <Question_One questions={[question]} key={key} />;
                  case 2:
                    return <Question_Two questions={[question]} key={key} />;
                  case 3:
                    return <Question_Three questions={[question]} key={key} />;
                  case 4:
                    return <Question_Four questions={[question]} key={key} />;
                  case 5:
                    return (
                      <React.Fragment key={key}>
                        <Question_Five questions={[question]} />
                        {showQuestion13 && question_13 && (
                          <article 
                            className="container responsive min-h-[300px]!important transition-all duration-300 ease-in-out transform-gpu animate-fadeIn"
                            key="question_13_container"
                          >
                            <Question_Thirteen questions={[question_13]} />
                          </article>
                        )}
                      </React.Fragment>
                    );
                  case 6:
                    {localStorage.getItem("5") === "20" && question_13 && (
                      <article className="container responsive min-h-[300px]!important" key="question_13">
                        <Question_Thirteen questions={[question_13]} />
                      </article>
                    )}
                    default:
                    return null;
                }
              })}

              {/* Вопросы 6-12 */}
              {questions_6_12.length > 0 && (
                <Questions_Six_Twelve questions={questions_6_12} />
              )}

              {/* Вопрос 14 */}
              {question_14 && (
                <article className="container responsive min-h-[300px]!important" key="question_14">
                  <Question_Fourteen questions={[question_14]} />
                </article>
              )}

              {/* Вопрос 15 */}
              {question_15 && (
                <article className="container responsive min-h-[300px]!important" key="question_15">
                  <Question_Fiveteen questions={[question_15]} />
                </article>
              )}

              {/* Вопрос 16 */}
              {question_16 && (
                <article className="container responsive min-h-[300px]!important" key="question_16">
                  <Question_Sixteen questions={[question_16]} />
                </article>
              )}

              {/* Вопрос 17 */}
              {question_17 && (
                <article className="container responsive min-h-[300px]!important" key="question_17">
                  <Questions_Seventeen questions={[question_17]} />
                </article>
              )}

              {/* Вопрос 18 */}
              {question_18 && (
                <article className="container responsive min-h-[300px]!important" key="question_18">
                  <Question_Eighteen questions={[question_18]} />
                </article>
              )}
              
            </>
          )}
        </div>
      )}
    </div>
  );
}
