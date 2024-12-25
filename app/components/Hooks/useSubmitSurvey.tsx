import { useState } from "react";
import { getOrCreateFingerprint, updateFingerprintStatus } from "@/lib/utils/fingerprint";

interface QuestionResponse {
  question: number;
  selected_option: number | null;
  custom_answer?: string;
}

export const useSubmitSurvey = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения ответов из localStorage
  const getAnswersFromLocalStorage = (): QuestionResponse[] => {
    const responses: QuestionResponse[] = [];
  
    Object.keys(localStorage).forEach((key) => {
      // Проверяем, является ли ключ числом (ID вопроса)
      if (!isNaN(Number(key))) {
        const questionId = parseInt(key, 10); // Преобразуем ключ в число
        const storedOption = localStorage.getItem(key);
  
        if (storedOption) {
          responses.push({
            question: questionId,
            selected_option: parseInt(storedOption, 10), // Преобразуем значение в число
          });
        }
      }
    });
  
    return responses; // Возвращаем все собранные ответы
  };

  // Функция для отправки данных анкеты
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const responses = getAnswersFromLocalStorage();
      console.log("Ответы из localStorage:", responses);
  
      // Список обязательных вопросов
      const requiredQuestionIds = [1, 2, 3, 4];
      const answeredQuestionIds = responses.map(response => response.question);
  
      // Проверяем, есть ли неотвеченные обязательные вопросы
      const unansweredRequiredQuestions = requiredQuestionIds.filter(
        id => !answeredQuestionIds.includes(id)
      );
      
      if (unansweredRequiredQuestions.length > 0) {
        setError("Пожалуйста, ответьте на все обязательные вопросы.");
        return;
      }
  
      // Обновляем статус фингерпринта на "completed"
      updateFingerprintStatus("completed");
  
      const payload = {
        fingerprint: getOrCreateFingerprint(),
        question_responses: responses,
      };
  
      console.log("Отправляемый payload:", payload);
  
      // Отправляем данные на сервер
      const response = await fetch(
        "https://opros.pythonanywhere.com/api/v1/surveys/1/responses/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        throw new Error("Ошибка отправки данных.");
      }
  
      alert("Опрос успешно отправлен!");
    } catch (err) {
      console.error("Ошибка:", err);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка.");
    } finally {
      setLoading(false);
    }
  };
  
  return { handleSubmit, loading, error };
};