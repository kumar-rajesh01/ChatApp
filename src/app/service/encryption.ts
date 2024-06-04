import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {
  private key: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  encryptData(text: string): string {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const index = this.key.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + 5) % this.key.length; // Shift by 5 characters, you can change this value for stronger encryption
        encryptedText += this.key[newIndex];
      } else {
        encryptedText += char;
      }
    }
    return encryptedText;
  }

  decryptData(encryptedText: string): string {
    let decryptedText = '';
    encryptedText = encryptedText ?? "";
    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText.charAt(i);
      const index = this.key.indexOf(char);
      if (index !== -1) {
        let newIndex = index - 5;
        if (newIndex < 0) {
          newIndex = this.key.length + newIndex; // Handle negative index
        }
        decryptedText += this.key[newIndex];
      } else {
        decryptedText += char;
      }
    }
    return decryptedText;
  }
  // key = CryptoJS.enc.Utf8.parse("chat_App#2024-06");
  // iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

  // encryptData(data: string, key?: string): string {
  //   const actualKey = key ? CryptoJS.enc.Utf8.parse(key) : this.key;
  //   const encrypted = CryptoJS.AES.encrypt(data, actualKey, { iv: this.iv });
  //   // Concatenate IV and encrypted message to form the final string
  //   const ivHex = this.iv.toString();
  //   const encryptedHex = encrypted.ciphertext.toString();
  //   return ivHex + encryptedHex;
  // }

  // decryptData(data: string, key?: string): string {
  //   const actualKey = key ? CryptoJS.enc.Utf8.parse(key) : this.key;
  //   // Extract IV and ciphertext from the data string
  //   const ivHex = data.slice(0, 32); // 32 hex characters = 16 bytes
  //   const encryptedHex = data.slice(32);
  //   const iv = CryptoJS.enc.Hex.parse(ivHex);
  //   const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
  //   const decrypted = CryptoJS.AES.decrypt(
  //     { ciphertext: encrypted } as any,
  //     actualKey,
  //     { iv: iv }
  //   );
  //   return decrypted.toString(CryptoJS.enc.Utf8);
  // }
  // encryptData(data: string, key?: string): string {
  //   return CryptoJS.AES.encrypt(data, key ?? this.key).toString();
  // }

  // decryptData(data: string, key?: string): string {
  //   const bytes = CryptoJS.AES.decrypt(data, key ?? this.key);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // }

  
  // private iv: Uint8Array;
  // private encryptionKey: CryptoKey;

  // constructor() {
  //   this.iv = window.crypto.getRandomValues(new Uint8Array(16));
  //   this.generateEncryptionKey();
  // }

  // private generateEncryptionKey() {
  //   window.crypto.subtle.generateKey({ name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt'])
  //     .then(key => {
  //       this.encryptionKey = key;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  // encryptData(data: string): Promise<ArrayBuffer> {
  //   const encoder = new TextEncoder();
  //   const dataToEncrypt = encoder.encode(data);

  //   return window.crypto.subtle.encrypt({ name: 'AES-CBC', iv: this.iv }, this.encryptionKey, dataToEncrypt);
  // }

  // decryptData(encryptedData: ArrayBuffer): Promise<string> 
  // {
  //   return window.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv }, this.encryptionKey, encryptedData)
  //     .then(plainText => {
  //       const decoder = new TextDecoder();
  //       return decoder.decode(plainText);
  //     });
  // }
  
}