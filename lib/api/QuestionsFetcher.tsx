"use client";
import { useState, useEffect } from "react";

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
        const response = await fetch(
          "https://opros.pythonanywhere.com/api/v1/surveys/1/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Преобразование данных API в ожидаемую структуру
        const questions: Question[] = data.questions.map((q: any) => ({
          id: q.id,
          text: q.text,
          is_required: false, // Если поле отсутствует, задаем значение по умолчанию
          options: q.answer_options.map((option: any) => ({
            id: option.id,
            text: option.text,
          })),
        }));

        onFetch(questions);
      } catch (error) {
        setError("Ошибка загрузки вопросов");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return null; // Компонент не рендерит ничего, кроме состояния загрузки/ошибки
}
