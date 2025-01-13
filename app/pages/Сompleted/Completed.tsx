"use client";

export default function Completed() {
  return (
    <div className="p-8 mt-8 font-inter rounded-xl text-center max-w-xl mx-auto">
      <h1 className="text-3xl text-gray-900 font-bold mb-6 CompletedTextOne">
        Вы завершили опрос!
      </h1>
      <p className="text-xl text-gray-800 mb-6 CompletedTextTwo">
        Спасибо за участие! Ваши ответы помогут улучшить судебную систему
        Кыргызстана, сделав её более прозрачной и доступной.
      </p>
      <p className="text-lg text-gray-600 mb-6 CompletedTextThree">
        Обратите внимание, что вы не можете пройти опрос повторно в течение 30
        дней, чтобы обеспечить точность и честность результатов.
      </p>
      <p className="text-lg text-gray-700 italic CompletedTextFour ">
        Ваш вклад имеет большое значение для нас!
      </p>
    </div>
  );
}
