"use client";
import { useState } from "react";
import "@/lib/utils/responsive.css";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher"; // Импортируем компонент для загрузки вопросов
import Question_One from "../components/Questions_BlankOne/Question_1";
import Question_Two_Three from "../components/Questions_BlankOne/Question_2-3";
import Question_Four from "../components/Questions_BlankOne/Question_4";
import Question_Five from "../components/Questions_BlankOne/Question_5";
import Question_Six from "../components/Questions_BlankOne/Question_6";
import Question_Six_One from "../components/Questions_BlankOne/Question_6.1";
import Question_Seven from "../components/Questions_BlankOne/Question_7";
import Question_Eight from "../components/Questions_BlankOne/Question_8";

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

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Функция для обновления состояния вопросов
  const handleFetchQuestions = (fetchedQuestions: Question[]) => {
    setQuestions(fetchedQuestions);
  };

  // Массив компонентов, которые мы будем рендерить
  const components = [
    <Question_One key={1} questions={questions} />,
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
      {/* Компонент для загрузки вопросов */}
      <QuestionsFetcher onFetch={handleFetchQuestions} />

      <div className="flex justify-center items-center flex-col w-full col-span-2">
        {components.map((Component, index) => (
          <article key={index} className="container responsive">
            {Component}
          </article>
        ))}
      </div>
    </div>
  );
}
