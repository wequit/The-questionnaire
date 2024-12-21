import React, { createContext, useState, useContext } from "react";

// Типы для контекста
type Language = "ru" | "kg";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

// Создаем контекст для языка
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Хук для использования контекста языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Компонент-поставщик контекста
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("kg");

  // Функция для переключения языка
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ru" ? "kg" : "ru"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
