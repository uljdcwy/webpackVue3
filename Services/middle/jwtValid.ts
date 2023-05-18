import Jwt from "jsonwebtoken";

const secret = "wxy-ittiger"

export const getToken = (loginData, expTime = 14400) => {
    return Jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (expTime),
        data: loginData
    }, secret)
};

export const validToken = async (ctx,next) => {
    try {
        let decoded = Jwt.verify(ctx.request.header.token, secret);
        await next();
    } catch (err) {
        // err
        ctx.body = {
            msg: "token验证失败",
            code: 0
        }
    }
}
