"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/utils/LanguageContext";

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

  const { language } = useLanguage();
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(
          "https://opros.pythonanywhere.com/api/v1/surveys/1/",
          {
            method: "GET",
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTUwMTM4LCJpYXQiOjE3MzUxNDY1MzgsImp0aSI6ImI3NDZmYTNlODZmYjQ5YmJhMDc2ZjUzZWEzNTZlYjJjIiwidXNlcl9pZCI6Mn0.zk9tA5IZ1yZ9K-7ooLhgL9ND1hUoKeAFdG8TMobFU38",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        const survey: Survey = {
          title: language === "ru" ? data.title_ru : data.title_kg,
          description:
            language === "ru" ? data.description_ru : data.description_kg,
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
  
        onFetch(survey);
      } catch (error) {
        setError("Ошибка загрузки данных опроса");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSurvey();
  }, [language]);
  

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return null;
}