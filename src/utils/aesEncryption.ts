import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_AES_SECRET;
const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

export const encrypt = (plainText: string): string => {
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decrypt = (cipherBase64: string): string => {
  const encryptedHex = CryptoJS.enc.Base64.parse(cipherBase64);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedHex
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
