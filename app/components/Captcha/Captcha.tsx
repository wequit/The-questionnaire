// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const Captcha = () => {
//   const [captchaUrl, setCaptchaUrl] = useState<string | null>(null); // URL изображения капчи
//   const [captchaKey, setCaptchaKey] = useState<string | null>(null); // Ключ капчи
//   const [captchaText, setCaptchaText] = useState(''); // Введенный текст капчи
//   const [captchaValid, setCaptchaValid] = useState<boolean | null>(null); // Результат проверки капчи

//   // Загрузка капчи при загрузке компонента
//   useEffect(() => {
//     const fetchCaptcha = async () => {
//       // Получаем captcha_key и captcha_image_url
//       const response = await fetch('http://127.0.0.1:8000/api/verify-captcha/', {
//         method: 'POST',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCaptchaUrl(data.captcha_image_url); // Устанавливаем URL изображения капчи
//         setCaptchaKey(data.captcha_key); // Сохраняем ключ капчи
//       } else {
//         console.error('Не удалось загрузить капчу');
//       }
//     };

//     fetchCaptcha();
//   }, []);

//   const handleCaptchaSubmit = async () => {
//     // Проверяем, есть ли ключ капчи
//     if (!captchaKey) {
//       console.error('Captcha key is missing');
//       return;
//     }

//     // Отправляем POST-запрос для проверки капчи
//     const response = await fetch('http://127.0.0.1:8000/api/verify-captcha/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_input: captchaText, // Текст, введенный пользователем
//         captcha_key: captchaKey, // Ключ капчи
//       }),
//     });

//     const result = await response.json();

//     // Проверяем результат
//     if (result.success) {
//       setCaptchaValid(true);
//     } else {
//       setCaptchaValid(false);
//     }
//   };

//   return (
//     <div>
//       <div>
//         {/* Отображаем изображение капчи */}
//         {captchaUrl && <Image width={400} height={400} src={captchaUrl} alt="captcha" />}
//       </div>
//       {/* Поле для ввода текста капчи */}
//       <input
//         type="text"
//         value={captchaText}
//         onChange={(e) => setCaptchaText(e.target.value)}
//         placeholder="Введите капчу"
//       />
//       {/* Кнопка для проверки капчи */}
//       <button onClick={handleCaptchaSubmit}>Проверить</button>

//       {/* Результат проверки */}
//       {captchaValid !== null && (
//         <div>{captchaValid ? 'Капча введена правильно!' : 'Капча введена неправильно.'}</div>
//       )}
//     </div>
//   );
// };

// export default Captcha;
