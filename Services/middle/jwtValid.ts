import Jwt from "jsonwebtoken";

const secret = "wxy-ittiger"

export const getToken = (loginData) => {
    return Jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (14400),
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
            msg: "token已过期请重新登录",
            code: 0
        }
    }
}
