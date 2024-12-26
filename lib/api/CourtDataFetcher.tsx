// components/CourtDataFetcher.tsx
'use client';

import { useEffect } from 'react';
import { useAnswerContext } from '@/lib/utils/AnswerContext'; 

interface CourtData {
  id: number;
  name_ru: string;
}

interface CourtDataFetcherProps {
  id: string | string[] | undefined; 
}

const CourtDataFetcher = ({ id }: CourtDataFetcherProps) => {
  const { setCourtName } = useAnswerContext(); 

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://opros.pythonanywhere.com/api/v1/court/${id}/`);
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          const data: CourtData = await response.json();
          setCourtName(data.name_ru); 
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      };

      fetchData();
    }
  }, [id, setCourtName]); 

  return null; 
};

export default CourtDataFetcher;
