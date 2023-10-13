import { encryption, decrypt } from "./desensitization.js"
import { EncryptionType } from "./EncryptionType.ts"
export const transformMiddle = async (ctx,next) => {
    let params = ctx.request.body;
    let phoneSercert = encryption(params.phone);
    let cardIDSercert = encryption(params.cardID, EncryptionType.Identification);
    ctx.request.body.phone =  phoneSercert.encrypted;
    ctx.request.body.cardID =  cardIDSercert.encrypted;
    ctx.request.body.phoneEncryption =  phoneSercert.ciphertext;
    ctx.request.body.cardIDEncryption =  cardIDSercert.ciphertext;
    await next();
    params = null;
    phoneSercert = null;
    cardIDSercert = null;
}