"use client";
import React, { useState } from "react";
import "@/lib/utils/responsive.css";
import Question_Fifteen from "@/app/components/Questions_BlankThree/Question_15";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";

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

export default function BlankTwo() {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Функция для обновления состояния вопросов
  const handleFetchQuestions = (fetchedQuestions: Question[]) => {
    setQuestions(fetchedQuestions);
  };
  const components = [<Question_Fifteen key={15} questions={questions} />];

  return (
    <div>
      <QuestionsFetcher onFetch={handleFetchQuestions} />

      <div className="flex justify-center items-center flex-col w-full col-span-2">
        {questions.length === 2 ? (
          <p>Вопросы загружаются...</p>
        ) : (
          components.map((Component, index) => (
            <article
              key={index}
              className="container responsive min-h-[300px]!important"
            >
              {Component}
            </article>
          ))
        )}{" "}
      </div>
    </div>
  );
}
