'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AnswerContextProps {
  getAnswer: (key: string) => string | null;
  setAnswer: (key: string, value: string) => void;
  getAllAnswers: () => Record<string, string | null>;
  courtName: string | null;
  setCourtName: (courtName: string) => void;
  courtId: string | null; 
  setCourtId: (courtId: string | null) => void; 
}

const AnswerContext = createContext<AnswerContextProps | undefined>(undefined);

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [courtName, setCourtName] = useState<string | null>(null);
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
    const courtIdFromUrl = window.location.pathname.split('/')[2]; 
    if (courtIdFromUrl) {
      setCourtId(courtIdFromUrl);
    }

    const fetchCourtData = async (courtId: string | null) => {
      if (courtId) {
        try {
          const response = await fetch(`https://opros.pythonanywhere.com/api/v1/court/${courtId}/`);
          const data = await response.json();
          setCourtName(data.name_ru);
        } catch (error) {
          console.error('Ошибка при загрузке данных о суде:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourtData(courtIdFromUrl);
  }, [courtId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <AnswerContext.Provider value={{ getAnswer, setAnswer, getAllAnswers, courtName, setCourtName, courtId, setCourtId }}>
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
