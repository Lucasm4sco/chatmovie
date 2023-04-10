import CryptoJS from 'crypto-js';
import { config } from 'dotenv';

config()

export const generateRandomKey = () => {
    const keySize = 256 / 8;
    const randomKey = CryptoJS.lib.WordArray.random(keySize);
    const base64 = CryptoJS.enc.Base64.stringify(randomKey);
    return base64
}

export const encryptKey = (key) => {
    const ciphertext = CryptoJS.AES.encrypt(key, process.env.MASTER_KEY).toString();
    return ciphertext;
}

export const decryptKey = (key) => {
    const bytes = CryptoJS.AES.decrypt(key, process.env.MASTER_KEY);
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedKey
}

export const encryptText = (text, key) => {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext
}

export const decryptText = (text, key) => {
    const bytes = CryptoJS.AES.decrypt(text, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}