// // import CryptoJS from "crypto-js";
import CryptoJS from "react-native-crypto-js";


// const SECRET_KEY = CryptoJS.enc.Utf8.parse(
//   process.env.REACT_APP_SECRET_KEY?.substring(0, 32)
// );

// NEW_KEY = "a3f1c8b273d1b4e5f6a7c8d9e0f123456789abcdef123456789abcdef1234567"

// const REACT_APP_SECRET_KEY = NEW_KEY.substring(0, 32)

// export const encryptData = (data) => {
//   return CryptoJS.AES.encrypt(data, REACT_APP_SECRET_KEY).toString();

// };

// export const decryptData = (ciphertext) => {
//   let bytes = CryptoJS.AES.decrypt(ciphertext, REACT_APP_SECRET_KEY);
//   let originalText = bytes.toString(CryptoJS.enc.Utf8)
//   return originalText
//   // try {
//   //   const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
//   //     mode: CryptoJS.mode.ECB,
//   //     padding: CryptoJS.pad.Pkcs7,
//   //   });
//   //   return CryptoJS.enc.Utf8.stringify(bytes);
//   // } catch (error) {
//   //   console.error("Decryption Error:", error?.message);
//   //   return null;
//   // }
// };

// Encrypt-Decrypt.js

// import CryptoJS from 'crypto-js';

// const RAW_SECRET_KEY = 'a3f1c8b273d1b4e5f6a7c8d9e0f123456789abcdef123456789abcdef1234567';
// const SECRET_KEY = CryptoJS.enc.Utf8.parse(RAW_SECRET_KEY.substring(0, 32));

// export const encryptData = (data) => {
//   const encrypted = CryptoJS.AES.encrypt(
//     CryptoJS.enc.Utf8.parse(data),
//     SECRET_KEY,
//     {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );
//   return encrypted.toString();
// };

// export const decryptData = (ciphertext) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return CryptoJS.enc.Utf8.stringify(bytes);
//   } catch (error) {
//     console.error('Decryption Error:', error?.message);
//     return null;
//   }
// };


// import CryptoJS from "react-native-crypto-js";

// const NEW_KEY = "a3f1c8b273d1b4e5f6a7c8d9e0f123456789abcdef123456789abcdef1234567";
// const REACT_APP_SECRET_KEY = NEW_KEY.substring(0, 32);

// export const encryptData = (data) => {
//   return CryptoJS.AES.encrypt(data, REACT_APP_SECRET_KEY).toString();
// };

// export const decryptData = (ciphertext) => {
//   let bytes = CryptoJS.AES.decrypt(ciphertext, REACT_APP_SECRET_KEY);
//   let originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return originalText;
// };



const NEW_KEY = "a3f1c8b273d1b4e5f6a7c8d9e0f123456789abcdef123456789abcdef1234567";
const SECRET_KEY = NEW_KEY.substring(0, 32);  // Ensure the key is 32 bytes long for AES-256

/**
 * Encrypts data using AES-256-ECB mode.
 * @param {string|object} data - The data to encrypt.
 * @returns {string|null} - The Base64 encoded ciphertext or null if an error occurs.
 */
export const encryptData = (data) => {
  try {
    // Ensure data is a string (if it's an object, we convert it to JSON)
    const dataString = typeof data === "object" ? JSON.stringify(data) : String(data);

    // Encrypt the data using AES-256-ECB mode (no IV required)
    const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();

    // Return the encrypted data as a Base64 string
    return encrypted;
  } catch (error) {
    console.error("Encryption Error:", error.message);
    return null;
  }
};

// export const decryptData = (ciphertext) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     });
 
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//     return decrypted;
//   } catch (error) {
//     console.error("Decryption Error:", error.message);
//     return null;
//   }
// };

export const decryptData = (ciphertext) => {
  try {
    // Decrypt the ciphertext using AES-256-ECB mode (no IV required)
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    
    // Convert the decrypted bytes back to a UTF-8 string
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    // If the result is not valid UTF-8 (empty string), return null
    if (!originalText) {
      console.error("Decryption Error: Invalid ciphertext or wrong key.");
      return null;
    }

    return originalText;
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return null;
  }
};