import { useState } from 'react';
import { getOrCreateFingerprint, updateFingerprintStatus } from '@/lib/utils/fingerprint';

export const useSubmitSurvey = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (answers) => {
    setLoading(true);
    setError(null);

    try {
      const fingerprintData = getOrCreateFingerprint();

      const payload = {
        fingerprintId: fingerprintData.id,
        answers,
        status: 'completed',
      };

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

      // Успешная отправка
      updateFingerprintStatus('completed');
      alert('Опрос успешно отправлен!');
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.message || 'Неизвестная ошибка.');
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
};
