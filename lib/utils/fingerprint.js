import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateFingerprint = () => {
  const fingerprintKey = 'survey_fingerprint';
  let fingerprintData = localStorage.getItem(fingerprintKey);

  if (!fingerprintData) {
    const newFingerprint = {
      id: uuidv4(),
      status: 'not_completed',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(fingerprintKey, JSON.stringify(newFingerprint));
    return newFingerprint;
  }

  try {
    return JSON.parse(fingerprintData);
  } catch (error) {
    console.error("Ошибка при разборе данных из localStorage:", error);
    const newFingerprint = {
      id: uuidv4(),
      status: 'not_completed',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(fingerprintKey, JSON.stringify(newFingerprint));
    return newFingerprint;
  }
};


export const updateFingerprintStatus = (status) => {
  const fingerprintKey = 'survey_fingerprint';
  let fingerprintData = localStorage.getItem(fingerprintKey);

  if (fingerprintData) {
    try {
      fingerprintData = JSON.parse(fingerprintData);
      fingerprintData.status = status;
      localStorage.setItem(fingerprintKey, JSON.stringify(fingerprintData));
    } catch (error) {
      console.error("Ошибка при обновлении статуса отпечатка в localStorage:", error);
    }
  }
};

