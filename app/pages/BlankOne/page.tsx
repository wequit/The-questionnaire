"use client";

import { useState } from "react";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_One from "@/app/components/Questions_BlankOne/Question_1";
import "@/lib/utils/responsive.css";
import Question_Two_Three from "@/app/components/Questions_BlankOne/Question_2-3";
import Question_Four from "@/app/components/Questions_BlankOne/Question_4";
import Question_Five from "@/app/components/Questions_BlankOne/Question_5";
import Question_Six from "@/app/components/Questions_BlankOne/Question_6";
import Question_Six_One from "@/app/components/Questions_BlankOne/Question_6.1";
import Question_Seven from "@/app/components/Questions_BlankOne/Question_7";
import Question_Eight from "@/app/components/Questions_BlankOne/Question_8";

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

interface Survey {
  title: string;
  description: string;
  questions: Question[];
}

export default function BlankOne() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleFetchSurvey = (survey: Survey) => {
    setQuestions(survey.questions); // Извлекаем вопросы из Survey
  };

  const components = [
    <Question_One key={1} questions={questions}  />,
    <Question_Two_Three key={2} questions={questions} />,
    <Question_Four key={3} questions={questions} />,
    <Question_Five key={4} questions={questions} />,
    <Question_Six key={5} questions={questions} />,
    <Question_Six_One key={6} questions={questions} />,
    <Question_Seven key={7} questions={questions} />,
    <Question_Eight key={8} questions={questions} />,
  ];

  return (
    <div>
      {/* Фетчинг данных */}
      <QuestionsFetcher onFetch={handleFetchSurvey}/>

      {/* Основной контент */}
      <div className="flex justify-center items-center flex-col w-full col-span-2">
        {questions.length === 0 ? (
          <p>Вопросы загружаются...</p>
        ) : (
          components.map((Component, index) => (
            <article key={index} className="container responsive min-h-[300px]!important">
              {Component}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
