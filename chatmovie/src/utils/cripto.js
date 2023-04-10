import CryptoJS from "crypto-js";

export const decryptText = (text, key) => {
    const bytes = CryptoJS.AES.decrypt(text, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}