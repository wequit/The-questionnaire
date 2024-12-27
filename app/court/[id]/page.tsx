"use client";
import { useCallback, useState } from "react";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Question_One from "@/app/components/Questions_BlankOne/Question_1";
import "@/lib/utils/responsive.css";
import Question_Two from "@/app/components/Questions_BlankOne/Question_2";
import Question_Two_Three from "@/app/components/Questions_BlankOne/Question_3";
import Question_Four from "@/app/components/Questions_BlankOne/Question_4";
import Question_Five from "../../components/Questions_BlankOne/Question_5";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetchSurvey = useCallback((survey: Survey) => {
    setQuestions(survey.questions);
    setLoading(false); // Устанавливаем состояние загрузки
  }, []);

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
          {loading ? (
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
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
