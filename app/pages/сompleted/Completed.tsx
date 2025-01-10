"use client"; // Для работы в клиентском компоненте Next.js 13+


export default function Completed() {

  const handleGoBack = () => {
    // Очищаем фингерпринт из localStorage
    localStorage.removeItem('survey_fingerprint');
  
    // Перезагружаем страницу
    window.location.reload();
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Спасибо за участие!</h1>
        <p className="text-gray-700 mb-4">
          Вы уже прошли опрос. Благодарим за ваше время и участие.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Вернуться обратно
        </button>
      </div>
    </div>
  );
}
