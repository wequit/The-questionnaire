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

  const getAnswersFromLocalStorage = (): QuestionResponse[] => {
    const responses: QuestionResponse[] = [];
  
    Object.keys(localStorage).forEach((key) => {
      if (!isNaN(Number(key))) {
        const questionId = parseInt(key, 10); 
        const storedOption = localStorage.getItem(key);
  
        if (storedOption) {
          responses.push({
            question: questionId,
            selected_option: parseInt(storedOption, 10), 
          });
        }
      }
    });
  
    return responses; 
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const responses = getAnswersFromLocalStorage();
      console.log("Ответы из localStorage:", responses);
  
      const requiredQuestionIds = [1, 2, 3, 4];
      const answeredQuestionIds = responses.map(response => response.question);
  
      const unansweredRequiredQuestions = requiredQuestionIds.filter(
        id => !answeredQuestionIds.includes(id)
      );
      
      if (unansweredRequiredQuestions.length > 0) {
        setError("Пожалуйста, ответьте на все обязательные вопросы.");
        return;
      }
  
      updateFingerprintStatus("completed");
  
      const payload = {
        fingerprint: getOrCreateFingerprint(),
        question_responses: responses,
      };
  
      console.log("Отправляемый payload:", payload);
  
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