import CryptoJS from "crypto-js"
import config from "../config";

export enum EncryptionType {
    // 加密手机号枚举
    Phone,
    // 加密身分证号枚举
    Identification,
    // 身份证名称
    Name
}
// 获取全局配置中的密钥
const sercert = config.sercert;
// 对字符进行加密，并返回加密后的内容
export const encryption = (encrypted: any, type: EncryptionType = EncryptionType.Phone, level: number = 3): any => {
    encrypted = (typeof encrypted != 'string') ? JSON.stringify(encrypted) : encrypted;
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encrypted), sercert).toString();
    
    // 验证类型为手机号进行加密
    if (type == EncryptionType.Phone) {
        encrypted = encrypted.replace(/(.{3})(.{6})/g, (expStr, $1, $2) => {
            return $1 + "******";
        })
        // 验证类型为身份证号进行加密
    } else if (type == EncryptionType.Identification) {
        encrypted = encrypted.replace(/(.{6})(.{8})/g, (expStr, $1, $2) => {
            return $1 + "********";
        })
        // 验证类型为身份证名称进行加密
    } else if (type == EncryptionType.Name) {
        encrypted = encrypted.replace(/(.{1})(.+)/g, (expStr, $1, $2) => {
            return $1 + $2.replace(/./g,"*");
        })
    }
    // 默认安全等级
    if (level != 3) {
        encrypted
    };


    return {
        encrypted,
        ciphertext
    }
}
// 解密加密后的编码
export const decrypt = (ciphertext: string) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, sercert);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
