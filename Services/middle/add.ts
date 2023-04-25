import { execute } from "../mysql";

export const addMiddle = async (ctx) => {
    try {
        let params = ctx.request.body;
        let keys: string = '';
        let values: string = '';
        for (let key in params) {
            let val = params[key];
            if(typeof val == 'string'){
                values +=  values ?  `, "${val}"` : `"${val}"`;
            }else{
                values +=  values ?  `, ${val}` : val;
            }
            keys +=  keys ?  (', ' + key) : key;
        }

        console.log(keys,"keys",values,"values")

        let result = await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, []);

        ctx.body = result;
    } catch (e) {
        ctx.body = { code: 0, msg: '新增失败' };

    }
}