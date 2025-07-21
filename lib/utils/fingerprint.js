import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateFingerprint = () => {
  const fingerprintKey = 'survey_fingerprint';
  let fingerprintData = Cookies.get(fingerprintKey);

  if (!fingerprintData) {
    const newFingerprint = {
      id: uuidv4(),
      status: 'not_completed',
      createdAt: new Date().toISOString(),
    };
    Cookies.set(fingerprintKey, JSON.stringify(newFingerprint), {
      expires: 7, 
      sameSite: 'None', 
      secure: true, 
    });
    return newFingerprint;
  }

  try {
    return JSON.parse(fingerprintData);
  } catch (error) {
    console.error("Ошибка при разборе куки:", error);
    const newFingerprint = {
      id: uuidv4(),
      status: 'not_completed',
      createdAt: new Date().toISOString(),
    };
    Cookies.set(fingerprintKey, JSON.stringify(newFingerprint), {
      expires: 7,
      sameSite: 'None',
      secure: true,
    });
    return newFingerprint;
  }
};

export const updateFingerprintStatus = (status) => {
  const fingerprintKey = 'survey_fingerprint';
  let fingerprintData = Cookies.get(fingerprintKey);

  if (fingerprintData) {
    try {
      fingerprintData = JSON.parse(fingerprintData);
      fingerprintData.status = status;
      Cookies.set(fingerprintKey, JSON.stringify(fingerprintData), {
        expires: 7,
        sameSite: 'None',
        secure: true,
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("fingerprint-updated"));
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса отпечатка:", error);
    }
  }
};
