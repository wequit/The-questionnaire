import React, { useEffect, useState } from 'react';
import { useAnswerContext } from '../utils/AnswerContext';

interface CourtName {
  ru: string;
  kg: string;
}

interface CourtDataFetcherProps {
  courtId: string; // courtId приходит как пропс
  children: (courtName: CourtName | null) => React.ReactNode; // Дочерние компоненты, которые принимают courtName
}

export const CourtDataFetcher: React.FC<CourtDataFetcherProps> = ({ children }) => {
  const [courtName, setCourtName] = useState<CourtName | null>(null);
  const { courtId } = useAnswerContext();

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const response = await fetch(`https://opros.sot.kg/api/v1/court/${courtId}/`);
        const data = await response.json();
        setCourtName({ ru: data.name_ru, kg: data.name_kg });
      } catch (error) {
        console.error("Ошибка при загрузке данных о суде:", error);
      }
    };

    if (courtId) {
      fetchCourtData();
    }
  }, [courtId]); // Обновляем запрос, когда courtId изменяется

  return <>{children(courtName)}</>; // Передаем данные в children
};
