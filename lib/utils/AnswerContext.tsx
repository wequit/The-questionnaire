import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import Loading from "./Loading";

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
  courtName: CourtName | null;
  setCourtName: (courtName: CourtName) => void;
  courtId: string | null;
  setCourtId: (courtId: string | null) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setValidError: (questionId: number, value: boolean) => void;
  getValidError: (questionId: number) => boolean;
  shouldShowQuestion13: () => boolean;
  answers: { [key: string]: string }; 
  error: number[];
  setError: (err: number[]) => void;
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
  const [answers, setAnswers] = useState<{ [key: string]: string }>(() => {
    if (typeof window !== "undefined") {
      const entries = Object.entries(localStorage)
        .filter(([k]) => !isNaN(Number(k)))
        .map(([k, v]) => [k, v as string]);
      return Object.fromEntries(entries);
    }
    return {};
  });
  const [error, setError] = useState<number[]>([]);

  const getAnswer = (key: string): string | null => {
    return answers[key] ?? null;
  };

  const setAnswer = (key: string, value: string): void => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
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
    const courtIdFromUrl = window.location.pathname.split("/")[3];
    if (courtIdFromUrl) {
      setCourtId(courtIdFromUrl);
    }

    const fetchCourtData = async (courtId: string | null) => {
      if (courtId) {
        try {
          const response = await fetch(
            `https://opros.sot.kg/api/v1/court/${courtId}/`
          );
          const data = await response.json();
          setCourtName({ ru: data.name_ru, kg: data.name_kg });
        } catch (error) {
          console.error("Ошибка при загрузке данных о суде:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourtData(courtIdFromUrl);
  }, [courtId]);

  const setValidError = useCallback((questionId: number, value: boolean) => {
    setValidErrors((prev) => {
      const updatedErrors = { ...prev, [questionId]: value };
      return updatedErrors;
    });
  }, []);

  const getValidError = (questionId: number): boolean => {
    return validErrors[questionId] || false;
  };

  const shouldShowQuestion13 = useCallback(() => {
    const answer = localStorage.getItem("5");
    if (!answer) return false;
    
    const question5 = questions.find(q => q.id === 5);
    if (!question5) return false;

    const selectedOption = question5.options.find(
      opt => opt.id.toString() === answer
    );
    
    return selectedOption?.text_ru === "Уголовному" || selectedOption?.text_kg === "Кылмыш";
  }, [questions]);

  if (loading) {
    return (
      <div className="loading-container">
       <Loading/>
      </div>
    );
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
        shouldShowQuestion13,
        answers, // обязательно передаём answers!
        error,
        setError,
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
