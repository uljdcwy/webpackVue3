// @ts-ignore
import CryptoJS from "crypto-js"
import config from "../config.js";
import { EncryptionType } from "./EncryptionType.ts"

const sercert = config.sercert;
export const encryption = (encrypted, type = EncryptionType.Phone, level = 3) => {
    encrypted = (typeof encrypted != 'string') ? JSON.stringify(encrypted) : encrypted;
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encrypted), sercert).toString();
    
    if (type == EncryptionType.Phone) {
        encrypted = encrypted.replace(/(.{3})(.{6})/g, (expStr, $1, $2) => {
            return $1 + "******";
        })
    } else if (type == EncryptionType.Identification) {
        encrypted = encrypted.replace(/(.{6})(.{8})/g, (expStr, $1, $2) => {
            return $1 + "********";
        })
    } else if (type == EncryptionType.Name) {
        encrypted = encrypted.replace(/(.{1})(.+)/g, (expStr, $1, $2) => {
            return $1 + $2.replace(/./g,"*");
        })
    }
    if (level != 3) {
        encrypted
    };


    return {
        encrypted,
        ciphertext
    }
}
export const decrypt = (ciphertext) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, sercert);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
