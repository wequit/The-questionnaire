'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

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

interface CourtName {
  ru: string;
  kg: string;
}

interface AnswerContextProps {
  getAnswer: (key: string) => string | null;
  setAnswer: (key: string, value: string) => void;
  getAllAnswers: () => Record<string, string | null>;
  courtName: CourtName | null; // Изменение типа
  setCourtName: (courtName: CourtName) => void;
  courtId: string | null;
  setCourtId: (courtId: string | null) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setValidError: (questionId: number, value: boolean) => void;
  getValidError: (questionId: number) => boolean;
}

interface ValidErrors {
  [questionId: number]: boolean;
}

const AnswerContext = createContext<AnswerContextProps | undefined>(undefined);

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [validErrors, setValidErrors] = useState<ValidErrors>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [courtName, setCourtName] = useState<CourtName | null>(null);
  const [courtId, setCourtId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getAnswer = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const setAnswer = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  const getAllAnswers = (): Record<string, string | null> => {
    const answers: Record<string, string | null> = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("Question_")) {
        answers[key] = localStorage.getItem(key);
      }
    });
    return answers;
  };

  useEffect(() => {
    const courtIdFromUrl = window.location.pathname.split('/')[3];
    if (courtIdFromUrl) {
      setCourtId(courtIdFromUrl);
    }

    const fetchCourtData = async (courtId: string | null) => {
      if (courtId) {
        try {
          const response = await fetch(`https://opros.pythonanywhere.com/api/v1/court/${courtId}/`);
          const data = await response.json();
          setCourtName({ ru: data.name_ru, kg: data.name_kg }); 
        } catch (error) {
          console.error('Ошибка при загрузке данных о суде:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourtData(courtIdFromUrl);
  }, [courtId]);

  const setValidError = (questionId: number, value: boolean) => {
    setValidErrors((prev) => ({ ...prev, [questionId]: value }));
  };

  const getValidError = (questionId: number): boolean => {
    return validErrors[questionId] || false;
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <AnswerContext.Provider
      value={{
        getAnswer,
        setAnswer,
        getAllAnswers,
        courtName,
        setCourtName,
        courtId,
        setCourtId,
        questions,
        setQuestions,
        setValidError,
        getValidError,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswerContext = (): AnswerContextProps => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error("useAnswerContext must be used within an AnswerProvider");
  }
  return context;
};
