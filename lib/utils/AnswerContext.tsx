"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface AnswerContextProps {
  getAnswer: (key: string) => string | null; 
  setAnswer: (key: string, value: string) => void; 
  getAllAnswers: () => Record<string, string | null>; 
}

const AnswerContext = createContext<AnswerContextProps | undefined>(undefined);

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <AnswerContext.Provider value={{ getAnswer, setAnswer, getAllAnswers }}>
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
