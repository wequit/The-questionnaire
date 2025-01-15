"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type Language = "ru" | "kg";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState<Language>(pathname.split("/")[1] as Language || "kg"); 

  useEffect(() => {
    const currentLanguage = pathname.split("/")[1] as Language;
    setLanguage(currentLanguage);
  }, [pathname]);

  const toggleLanguage = () => {
    const newLanguage = language === "ru" ? "kg" : "ru"; 

    const newPath = pathname.replace(`/${language}`, `/${newLanguage}`);
    router.push(newPath);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

