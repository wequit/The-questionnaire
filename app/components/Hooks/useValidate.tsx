'use client'
import { useAnswerContext } from "@/lib/utils/AnswerContext";

export const useValidate = () => {
  const { questions, error, setError, ...ctx } = useAnswerContext();
  const answers = (ctx as any).answers as { [key: string]: string };

  const handleNext = async () => {
    const missed: number[] = [];
    const selectedQ1 = answers["1"];
    for (const question of questions) {
      if ([9, 10, 11, 12, 13].includes(question.id) && selectedQ1 !== "1") continue;

      if ([13, 20].includes(question.id)) continue;

      if ([6].includes(question.id)) {
        const text = answers[`${question.id}_text`];
        if (!text || text.trim() === "") {
          missed.push(question.id);
          continue;
        }
        continue;
      }

      const answer =
        answers[question.id.toString()] ||
        answers[`${question.id}_custom`];

      if (!answer || answer.trim() === "") {
        missed.push(question.id);
        continue;
      }
    }

    setError(missed);
    return missed.length === 0 ? true : missed;
  };

  const updateAnsweredStatus = (questionId: number, isAnswered: boolean) => {
    // 
  };

  return {
    error,
    handleNext,
    updateAnsweredStatus,
  };
};
