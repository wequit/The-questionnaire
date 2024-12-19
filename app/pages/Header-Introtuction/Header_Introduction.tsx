  "use client";
  import { useEffect, useState } from "react";
  import Image from "next/image";
  import logo from "@/public/Logo.png";

  interface SurveyData {
    title: string;
    description: string;
  }

  export default function Introduction() {
    const [survey, setSurvey] = useState<SurveyData | null>(null); // Хранит title и description
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      // Функция для получения данных
      const fetchSurvey = async () => {
        try {
          const response = await fetch("https://opros.pythonanywhere.com/api/v1/surveys/1/");
          if (!response.ok) {
            throw new Error("Failed to fetch survey data");     
          }
          const data = await response.json();
          setSurvey({ title: data.title, description: data.description });
        } catch (err) {
          setError("Ошибка при загрузке данных");
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSurvey();
    }, []);

    if (loading) return <div className="text-center">Загрузка...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    
    return (
      <div className="p-6">
        <div className="flex justify-center mb-8">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="LogoWidth"
          />
        </div>

        {/* Отображаем title из API */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 textSizeTitle">
            {survey?.title}
          </h1>
        </div>

        {/* Отображаем description из API */}
        <p className="text-base text-gray-700 mb-4 textSizeBody">
          {survey?.description}
        </p>

        {/* Ваши статичные блоки */}
        <p className="text-base text-gray-700 mt-20 textSizeClosing">
          <strong>С уважением, Административный суд Нарынской области</strong>
        </p>
        <p className="text-base text-gray-700 mb-6 italic textSizeCallToAction">
          Внесите свой вклад в изменение системы правосудия с помощью отзывов!
        </p>
      </div>
    );
  }
