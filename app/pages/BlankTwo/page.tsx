"use client";
import React, { useState } from "react";
import "@/lib/utils/responsive.css";
import Question_Nine from "../../components/Questions_BlankTwo/Question_9";
import Question_Ten from "../../components/Questions_BlankTwo/Question_10";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_Eleven from "@/app/components/Questions_BlankTwo/Questions_11";
import Question_Twelve from "@/app/components/Questions_BlankTwo/Questions_12";
import Question_Twelve_One from "@/app/components/Questions_BlankTwo/Questions_12_1";
import Question_Thirteen from "@/app/components/Questions_BlankTwo/Questions_13";
import Question_Fourteen from "@/app/components/Questions_BlankTwo/Questions_14";

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
export default function BlankTwo() {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Функция для обновления состояния вопросов
  const handleFetchSurvey = (survey: Survey) => {
    setQuestions(survey.questions); // Извлекаем вопросы из Survey
  };
  const components = [
    <Question_Nine key={9} questions={questions} />,
    <Question_Ten key={10} questions={questions} />,
    <Question_Eleven key={11} questions={questions} />,
    <Question_Twelve key={12} questions={questions} />,
    <Question_Twelve_One key={13} questions={questions} />,
    <Question_Thirteen key={14} questions={questions} />,
    <Question_Fourteen key={15} questions={questions} />,
  ];

  return (
    <div>
      <QuestionsFetcher  onFetch={handleFetchSurvey} />

    <div className="flex justify-center items-center flex-col w-full col-span-2">
    {questions.length === 1 ? (
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
