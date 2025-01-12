"use client";
import { useState, useEffect, useRef } from "react";

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
  selected_option: number | null;
  custom_answer?: string;
}

interface Survey {
  title_ru: string;
  title_kg: string;
  description_ru: string;
  description_kg: string;
  questions: Question[];
}

interface QuestionsFetcherProps {
  onFetch: (survey: Survey) => void;
}

export default function QuestionsFetcher({ onFetch }: QuestionsFetcherProps) {
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        // Простой запрос без авторизации
        const response = await fetch(
          "https://opros.pythonanywhere.com/api/v1/surveys/1/"
        );

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных опроса");
        }

        const data = await response.json();

        const survey: Survey = {
          title_ru: data.title_ru,
          title_kg: data.title_kg,
          description_ru: data.description_ru,
          description_kg: data.description_kg,
          questions: data.questions.map((q: any) => ({
            id: q.id,
            text_ru: q.text_ru,
            text_kg: q.text_kg,
            is_required: q.has_other_option || false,
            options: q.answer_options.map((option: any) => ({
              id: option.id,
              text_ru: option.text_ru,
              text_kg: option.text_kg,
            })),
            selected_option: null,
            custom_answer: null,
          })),
        };

        onFetch(survey);
      } catch (err) {
        setError("Ошибка загрузки данных опроса");
        console.error("Error fetching survey:", err);
      }
    };

    fetchSurvey();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return null;
}
