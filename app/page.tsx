"use client";

import { useState } from "react";
import Introduction from "./components/Introduction";
import InformationSource  from "./components/InformationSource ";
import Question_One from "./components/Questions/Question_1";
import Question_Two_Three from "./components/Questions/Question_2-3";
import Question_Four from "./components/Questions/Question_4";
import Question_Five from "./components/Questions/Question_5";
import Question_Six from "./components/Questions/Question_6";
import Question_Six_One from "./components/Questions/Question_6.1";

export default function Home() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const progressPercentage = ((step + 1) / 16) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black bg-gradient-to-b from-blue-300 to-white ">
      <div className="w-full max-w-[55rem] mb-4 mt-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div
            className="h-2 bg-sky-700 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full ]  max-w-[55rem]">
        {step === 0 && <Introduction onNext={handleNext} />}
        {step === 1 && <InformationSource  onNext={handleNext} onBack={handleBack} />}
        {step === 2 && <Question_One onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Question_Two_Three onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <Question_Four onNext={handleNext} onBack={handleBack} />}
        {step === 5 && <Question_Five onNext={handleNext} onBack={handleBack} />}
        {step === 6 && <Question_Six onNext={handleNext} onBack={handleBack} />}
        {step === 7 && <Question_Six_One onNext={handleNext} onBack={handleBack} />}
      </div>
    </div>
  );
}
