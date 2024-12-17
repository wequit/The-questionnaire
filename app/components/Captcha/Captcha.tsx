// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const Captcha = () => {
//   const [captchaUrl, setCaptchaUrl] = useState<string | null>(null);
//   const [captchaText, setCaptchaText] = useState('');
//   const [captchaKey, setCaptchaKey] = useState<string | null>(null); // Стейт для хранения captcha_key
//   const [captchaValid, setCaptchaValid] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Загружаем капчу
//     const fetchCaptcha = async () => {
//       const response = await fetch('http://127.0.0.1:8000/api/captcha/');
//       const data = await response.blob();
//       const imageUrl = URL.createObjectURL(data);
//       setCaptchaUrl(imageUrl);  // captchaUrl теперь может быть строкой

//       // Предположим, что сервер возвращает ключ captcha_key, который нужно сохранить
//       const captchaKeyFromServer = await response.text(); // Предположим, что сервер возвращает ключ в тексте
//       setCaptchaKey(captchaKeyFromServer);  // Устанавливаем captcha_key
//     };

//     fetchCaptcha();
//   }, []);

//   const handleCaptchaSubmit = async () => {
//     // Логирование ввода пользователя
//     console.log('User input:', captchaText);
//     console.log('Captcha key:', captchaKey);

//     // Проверка на наличие captcha_key перед отправкой запроса
//     if (!captchaKey) {
//       console.error('Captcha key is missing');
//       return;
//     }

//     // Отправка POST запроса для проверки капчи
//     const response = await fetch('http://127.0.0.1:8000/api/verify-captcha/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_input: captchaText,  // Передаем user_input
//         captcha_key: captchaKey,  // Передаем captcha_key
//       }),
//     });

//     const result = await response.json();

//     // Проверка правильности введенной капчи
//     if (result.success) {
//       setCaptchaValid(true);
//     } else {
//       setCaptchaValid(false);
//     }
//   };

//   return (
//     <div>
//       <div>
//         {captchaUrl && <Image width={400} height={400} src={captchaUrl} alt="captcha" />}
//       </div>
//       <input
//         type="text"
//         value={captchaText}
//         onChange={(e) => setCaptchaText(e.target.value)}
//         placeholder="Введите капчу"
//       />
//       <button onClick={handleCaptchaSubmit}>Проверить</button>

//       {captchaValid !== null && (
//         <div>{captchaValid ? 'Капча введена правильно!' : 'Капча введена неправильно.'}</div>
//       )}
//     </div>
//   );
// };

// export default Captcha;
