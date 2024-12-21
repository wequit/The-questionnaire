"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/utils/LanguageContext"; // Используем контекст

// Определение типов для Survey, Question и Option
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

interface Survey {
  title: string;
  description: string;
  questions: Question[];
}

interface QuestionsFetcherProps {
  onFetch: (survey: Survey) => void;
}

export default function QuestionsFetcher({ onFetch }: QuestionsFetcherProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { language } = useLanguage(); // Получаем язык из контекста

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(
          "https://opros.pythonanywhere.com/api/v1/surveys/2/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Формируем объект Survey с учетом языка
        const survey: Survey = {
          title: language === "ru" ? data.title_ru : data.title_kg,
          description: language === "ru" ? data.description_ru : data.description_kg,
          questions: data.questions.map((q: any) => ({
            id: q.id,
            text: language === "ru" ? q.text_ru : q.text_kg,
            is_required: q.has_other_option || false,
            options: q.answer_options.map((option: any) => ({
              id: option.id,
              text: language === "ru" ? option.text_ru : option.text_kg,
            })),
          })),
        };

        onFetch(survey);  // Передаем данные о заголовке и описании
      } catch (error) {
        setError("Ошибка загрузки данных опроса");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [language]); // Перезагрузка данных при смене языка

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return null;
}
