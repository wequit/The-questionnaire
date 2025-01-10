'use client';

import './main.css';
import "@fontsource/open-sans/700.css"
import "@fontsource/merriweather"
import "@fontsource/inter/"; 
import { LanguageProvider } from "@/lib/utils/LanguageContext"; 
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Introduction from "../../pages/Header-Introtuction/Header_Introduction";
import FooterActions from "../../pages/FooterActions/FooterActions";
import { useState } from 'react';
import { AnswerProvider } from '@/lib/utils/AnswerContext';

interface Survey {
  title_ru: string;
  title_kg: string;
  description_ru: string;
  description_kg: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [survey, setSurvey] = useState<Survey | null>(null);

  const handleFetchSurvey = (fetchedSurvey: Survey) => {
    setSurvey(fetchedSurvey);
  };

  return (
    <html lang="kg" className="scroll-smooth">
      <body className='h-screen'>
        <AnswerProvider>
          <LanguageProvider>
            {/* Компонент для получения данных опроса */}
            <QuestionsFetcher onFetch={handleFetchSurvey} />
            
            <div className="bg-gray-100 bg-gradient-to-b from-slate-900 to-slate-500  ">
              <header className="flex justify-center items-center text-black">
                <div className="bg-white p-6 rounded-lg shadow-md w-full container mt-4 responsive">
                  {/* Передаем данные в Introduction, если они есть */}
                  {survey && (
                    <Introduction
                      title_ru={survey.title_ru}
                      title_kg={survey.title_kg}
                      description_ru={survey.description_ru}
                      description_kg={survey.description_kg}
                    />
                  )}
                </div>
              </header>

              <main className="flex justify-center items-center text-black ">
                {children}
              </main>

              <footer className="flex justify-center items-center text-black">
                <FooterActions />
              </footer>
            </div>
          </LanguageProvider>
        </AnswerProvider>
      </body>
    </html>
  );
}
