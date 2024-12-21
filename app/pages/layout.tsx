"use client";

import './main.css';
import { LanguageProvider } from "@/lib/utils/LanguageContext"; // Импортируем LanguageProvider
import QuestionsFetcher from "@/lib/api/QuestionsFetcher";
import Introduction from "./Header-Introtuction/Header_Introduction";
import FooterActions from "./FooterActions/FooterActions";
import { useState } from 'react';

interface Survey {
  title: string;
  description: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [survey, setSurvey] = useState<Survey | null>(null);

  const handleFetchSurvey = (fetchedSurvey: Survey) => {
    setSurvey(fetchedSurvey);
  };

  return (
    <html lang="kg">
      <body>
        <LanguageProvider>
          <QuestionsFetcher onFetch={handleFetchSurvey} />
          <div className="bg-gray-100 bg-gradient-to-b from-slate-300 to-slate-300">
            <header className="flex justify-center items-center text-black">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[46rem] mt-8 responsive">
                {survey && (
                  <Introduction
                    title={survey.title}
                    description={survey.description}
                  />
                )}
              </div>
            </header>

            <main className="flex justify-center items-center text-black">
              {children}
            </main>

            <footer className="flex justify-center items-center text-black">
              <FooterActions />
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
