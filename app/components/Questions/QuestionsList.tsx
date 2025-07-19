import { motion, AnimatePresence } from "framer-motion";
import QuestionRadio from "./QuestionRadio";
import { useAnswerContext } from "@/lib/utils/AnswerContext";
import { useValidate } from "@/app/components/Hooks/useValidate";

interface Option {
  id: number;
  text_ru: string;
  text_kg: string;
}

interface Question {
  id: number;
  text_ru: string;
  text_kg: string;
  is_required: boolean;
  options: Option[];
}

interface QuestionsListProps {
  questions: Question[];
}

export default function QuestionsList({ questions }: QuestionsListProps) {
  const { answers, error } = useAnswerContext();
  const show9to13 = answers["1"] === "1";
  const excludeStar = [13, 21];
  const requiredIds = questions.filter(q => q.is_required && !excludeStar.includes(q.id)).map(q => q.id);

  const filteredQuestions = questions.filter(
    (q) =>
      q.id < 9 ||
      q.id > 13 ||
      (q.id >= 9 && q.id <= 13 && show9to13)
  );

  return (
    <AnimatePresence>
      {filteredQuestions.map((question, idx) => (
        <motion.div
          key={question.id}
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionRadio question={question} displayNumber={idx + 1} error={error} requiredIds={requiredIds} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
} 