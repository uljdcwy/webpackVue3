
import axios from "axios";

export const validOpenId = async (ctx,next) => {
    let tokenData: any = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxca34d18dbadfa6cc&secret=09cb1a9d69194c54fbbcfd302ef54d22`);
    
    let validData = await axios.get(`https://api.weixin.qq.com/sns/auth?access_token=${tokenData.data.access_token}&openid=${ctx.request.body.personID}`);
    ctx.body = {
        code: 1,
        data: null,
        msg: JSON.stringify(validData.data)
    }
    // await next();
}