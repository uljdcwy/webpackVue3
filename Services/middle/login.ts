import { getToken } from "./jwtValid"
import { findTableMiddle } from "./getList"
import md5 from "md5";
export const loginMiddle = async (ctx, next) => {
    try {
        let params = ctx.request.body;

        if (!params.account) {
            ctx.body = {
                msg: "帐号不能为空",
                code: 0
            }
        } else if (!params.password) {
            ctx.body = {
                msg: "密码不能为空",
                code: 0
            }
        } else {

        }
    } catch (e) {
        ctx.body = {
            msg: "登录异常",
            data: null,
            code: 0
        }
    }
}