'use client';
import { useCallback, useMemo, useState, useEffect } from "react";
import { getOrCreateFingerprint } from "@/lib/utils/fingerprint";
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import "@/lib/utils/responsive.css";
import React from "react";
import QuestionsList from "@/app/components/Questions/QuestionsList";

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
  const [show9to13, setShow9to13] = useState(false);

  useEffect(() => {
    const checkShow = () => {
      const selected = localStorage.getItem("1");
      setShow9to13(selected === "1");
    };
    checkShow();
    window.addEventListener("storage", checkShow);
    return () => window.removeEventListener("storage", checkShow);
  }, []);

  const [fingerprint, setFingerprint] = useState(getOrCreateFingerprint());
  useEffect(() => {
    const onUpdate = () => setFingerprint(getOrCreateFingerprint());
    window.addEventListener("fingerprint-updated", onUpdate);
    return () => window.removeEventListener("fingerprint-updated", onUpdate);
  }, []);
  const hasCompletedSurvey = fingerprint.status === "completed";

  const handleFetchSurvey = useCallback(
    (survey: Survey) => {
      const updatedQuestions = survey.questions.map((q) => {
        if (q.id === 17) return { ...q, id: 16 };
        if (q.id === 18) return { ...q, id: 17 };
        if (q.id === 19) return { ...q, id: 18 };
        if (q.id === 20) return { ...q, id: 19 };
        if (q.id === 21) return { ...q, id: 20 };
        return q;
      });
      setQuestions(updatedQuestions);
    },
    [setQuestions]
  );

  return (
    <div>
      <QuestionsFetcher onFetch={handleFetchSurvey} /> 

      {hasCompletedSurvey ? (
        ''
      ) : (
        <div className="flex justify-center items-center flex-col w-full col-span-2">
          {questions.length === 0 ? (
            <p>Вопросы загружаются...</p>
          ) : (
            <>
              <QuestionsList questions={questions} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
