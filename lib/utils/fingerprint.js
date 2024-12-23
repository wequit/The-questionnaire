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

  return JSON.parse(fingerprintData);
};

export const updateFingerprintStatus = (status) => {
  const fingerprintKey = 'survey_fingerprint';
  let fingerprintData = JSON.parse(localStorage.getItem(fingerprintKey));

  if (fingerprintData) {
    fingerprintData.status = status;
    localStorage.setItem(fingerprintKey, JSON.stringify(fingerprintData));
  }
};
