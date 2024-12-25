"use client";

import { useState } from "react";
import { useQuestionStorage } from "./useQuestionStorage";

export const useValidate = () => {
  const [error, setError] = useState<boolean>(false);

  const { validateStep: validateQuestion1 } = useQuestionStorage({
    localStorageKey: "1",
  });
  const { validateStep: validateQuestion2 } = useQuestionStorage({
    localStorageKey: "2",
  });
  const { validateStep: validateQuestion3 } = useQuestionStorage({
    localStorageKey: "3",
  });
  const { validateStep: validateQuestion4 } = useQuestionStorage({
    localStorageKey: "4",
  });
  // const { validateStep: validateQuestion5 } = useQuestionStorage({
  //   localStorageKey: "Question_5",
  // });
  // const { validateStep: validateQuestion6 } = useQuestionStorage({
  //   localStorageKey: "Question_6",
  // });
  // const { validateStep: validateQuestion6_1 } = useQuestionStorage({
  //   localStorageKey: "Question_6_1",
  // });
  // const { validateStep: validateQuestion7 } = useQuestionStorage({
  //   localStorageKey: "Question_7",
  // });
  // const { validateStep: validateQuestion8 } = useQuestionStorage({
  //   localStorageKey: "Question_8",
  // });
  // const { validateStep: validateQuestion9 } = useQuestionStorage({
  //   localStorageKey: "Question_9",
  // });
  // const { validateStep: validateQuestion10 } = useQuestionStorage({
  //   localStorageKey: "Question_10",
  // });
  // const { validateStep: validateQuestion11 } = useQuestionStorage({
  //   localStorageKey: "Question_11",
  // });
  // const { validateStep: validateQuestion12 } = useQuestionStorage({
  //   localStorageKey: "Question_12",
  // });
  // const { validateStep: validateQuestion13 } = useQuestionStorage({
  //   localStorageKey: "Question_13",
  // });
  // const { validateStep: validateQuestion14 } = useQuestionStorage({
  //   localStorageKey: "Question_14",
  // });
  // const { validateStep: validateQuestion15 } = useQuestionStorage({
  //   localStorageKey: "Question_15",
  // });

  const handleNext = () => {
    if (
      validateQuestion1() &&
      validateQuestion2() &&
      validateQuestion3() &&
      validateQuestion4() 
      // validateQuestion5() &&
      // validateQuestion6() &&
      // validateQuestion6_1() &&
      // validateQuestion7() &&
      // validateQuestion8() &&
      // validateQuestion9() &&
      // validateQuestion10() &&
      // validateQuestion11() &&
      // validateQuestion12() &&
      // validateQuestion13() &&
      // validateQuestion14() &&
      // validateQuestion15()
    ) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleClearForm = () => {
    localStorage.clear();
    window.location.reload();
  };

  return {
    error,
    handleNext,
    handleClearForm,
  };
};
