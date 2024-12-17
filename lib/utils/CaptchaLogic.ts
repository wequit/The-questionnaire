// src/utils/CaptchaLogic.ts

export const fetchCaptcha = async (): Promise<{ imageUrl: string, captchaKey: string | null }> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/captcha/');
      if (!response.ok) throw new Error('Ошибка при получении капчи');
  
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      const captchaKey = response.headers.get('Captcha-Key'); // Если сервер присылает ключ, возьмем его
  
      return { imageUrl, captchaKey };
    } catch (error) {
      throw new Error('Ошибка при связи с сервером');
    }
  };
  
  export const verifyCaptcha = async (captchaKey: string, userInput: string): Promise<boolean> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify-captcha/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: userInput,
          captcha_key: captchaKey,
        }),
      });
  
      const data = await response.json();
      if (data.success) return true;
      throw new Error(data.message || 'Неверная капча');
    } catch (error) {
      throw new Error('Ошибка при проверке капчи');
    }
  };
  