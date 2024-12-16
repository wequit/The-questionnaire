"use client";
import { useState, useEffect } from "react";

// Интерфейс для вопроса и его опций
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

interface QuestionsFetcherProps {
  onFetch: (questions: Question[]) => void;
}

export default function QuestionsFetcher({ onFetch }: QuestionsFetcherProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/questions/");
        const data = await response.json();
        if (data.questions) {
          onFetch(data.questions); // Передаем вопросы родительскому компоненту
        }
      } catch (error) {
        setError("Error fetching questions");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    // Функция вызывается один раз при монтировании компонента
    fetchQuestions();
  }, []); // Пустой массив зависимостей, чтобы запрос был выполнен только один раз при монтировании компонента

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null; // Не отображаем ничего, так как вопросы передаются через пропсы
}
