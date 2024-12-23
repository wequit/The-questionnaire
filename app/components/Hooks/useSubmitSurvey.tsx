import { useState } from 'react';
import { getOrCreateFingerprint, updateFingerprintStatus } from '@/lib/utils/fingerprint';

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
      if (key.startsWith("Question_")) {
        const questionId = parseInt(key.replace("Question_", ""), 10);
        const selectedOption = localStorage.getItem(key);
        const customAnswer = localStorage.getItem(`${key}_other`) || null; 
  
        if (selectedOption && selectedOption !== "Другое:" && customAnswer === null) {
          responses.push({
            question: questionId,
            selected_option: parseInt(selectedOption, 10), 
          });
        }
  
        if (selectedOption === "Другое:" && customAnswer) {
          responses.push({
            question: questionId,
            selected_option: null, 
            custom_answer: customAnswer,
          });
        }
      }
    });
  
    return responses.filter(response => 
      response.selected_option !== null || response.custom_answer
    );
  };
  

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const fingerprintData = getOrCreateFingerprint();

      const responses = getAnswersFromLocalStorage();

      if (responses.length === 0) {
        setError('Пожалуйста, ответьте на все вопросы.');
        return;
      }

      const payload = {
        fingerprintData,
        question_responses: responses,
        status: "completed",
      };

      console.log('Payload:', payload); 

      const response = await fetch('https://opros.pythonanywhere.com/api/v1/surveys/2/responses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных.');
      }

      updateFingerprintStatus('completed');
      alert('Опрос успешно отправлен!');
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка.');
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
};
