// "use client";
// import { useEffect, useState } from "react";

// export default function InformationSource(){
//   const [selectedOption, setSelectedOption] = useState<string | null>(() => {
//     return localStorage.getItem("informationSource") || null;
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     // Инициализация значения из localStorage
//     const storedOption = localStorage.getItem("Question_1");
//     if (storedOption) {
//       setSelectedOption(storedOption);
//     }
//   }, []);

//   const handleOptionChange = (option: string) => {
//     setSelectedOption(option);
//     localStorage.setItem("informationSource", option);
//     setIsSubmitted(false); // Сбрасываем ошибку при выборе опции
//   };


//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-4">
//         Откуда Вы узнали об этой анкете? <span className="text-red-500">*</span>
//       </h2>
//       <div className="text-lg text-gray-700 mb-6 mt-8">
//         {["Стенды qr код", "Через WhatsАpp", "Через независимых юристов", "Через мероприятия (Театр, кино, собрания и т.д.)", "Через сотрудников суда"].map((option, index) => (
//           <div key={option} className="flex items-center mb-2">
//             <input
//               id={option}
//               name="source"
//               type="radio"
//               className="h-5 w-5 text-blue-600 focus:ring-0 border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 checked:bg-blue-600 checked:border-transparent"
//               onChange={() => handleOptionChange(option)}
//               checked={selectedOption === option}
//             />
//             <label htmlFor={option} className="ml-3 block text-gray-700">
//               {[
//                 "Стенды qr код",
//                 "Через WhatsАpp",
//                 "Через независимых юристов",
//                 "Через мероприятия (Театр, кино, собрания и т.д.)",
//                 "Через сотрудников суда",
//               ][index]}
//             </label>
//           </div>
//         ))}
//       </div>

//       {isSubmitted && !selectedOption && (
//         <div className="text-sm text-red-500 mt-2">
//           Этот обязательный вопрос.
//         </div>
//       )}
//     </div>
//   );
// }