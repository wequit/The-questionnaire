"use client";

import Introduction from "./components/Introduction";
import InformationSource from "./components/InformationSource ";
import Question_One from "./components/Questions/Question_1";
import Question_Two_Three from "./components/Questions/Question_2-3";
import Question_Four from "./components/Questions/Question_4";
import Question_Five from "./components/Questions/Question_5";
import Question_Six from "./components/Questions/Question_6";
import Question_Six_One from "./components/Questions/Question_6.1";
import Question_Seven from "./components/Questions/Question_7";

export default function Home() {
  const components = [
    <InformationSource key={0} />,
    <Question_One key={1} />,
    <Question_Two_Three key={2} />,
    <Question_Four key={3} />,
    <Question_Five key={4} />,
    <Question_Six key={5} />,
    <Question_Six_One key={6} />,
    <Question_Seven key={7} />,
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black bg-gradient-to-b from-sky-300 to-sky-200 ">
      {/* <div className="w-full max-w-[55rem] mb-4 mt-4">
        <div className="h-2 bg-gray-300 rounded-full">
          <div
            className="h-2 bg-sky-700 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div> */}
    
      <div className="bg-white p-6 rounded-2xl shadow-md w-full ]  max-w-[55rem] mt-8">
        <Introduction />
      </div>
      {components.map((Component, index) => (
        <div key={index} className="container">
          {Component}
        </div>
      ))}
    </div>
  );
}
