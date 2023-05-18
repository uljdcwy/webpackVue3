import CryptoJS from "crypto-js"

export enum EncryptionType {
    Phone,
    Identification
}

const sercert = "123456"

export const encryption = (encrypted: any, type: EncryptionType = EncryptionType.Phone, level: number = 3): any => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encrypted), sercert).toString();

    encrypted = (typeof encrypted != 'string') ? JSON.stringify(encrypted) : encrypted;

    if (type == EncryptionType.Phone) {
        encrypted = encrypted.replace(/(.{3})(.{6})/g, (expStr, $1, $2) => {
            return $1 + "******";
        })
    } else if (type == EncryptionType.Identification) {
        encrypted = encrypted.replace(/(.{6})(.{8})/g, (expStr, $1, $2) => {
            return $1 + "********";
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

export const decrypt = (ciphertext: string) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, sercert);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
