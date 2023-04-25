import { execute } from "../mysql";

export const updateMiddle = async function (ctx, next) {
    let params = ctx.request.body;
    let mainKey: any = 'id';
    let updateSql: string = '';

    for (let key in params) {
        if (key === ctx.mainKey) {
            mainKey = params[key];
            if(typeof mainKey == 'string'){
                mainKey = `"${mainKey}"`
            }
        } else {
            let val = params[key];
            if (typeof val == 'string') {
                updateSql += updateSql ? (`, ${key} = "${val}"`) : (`${key}  = "${val}"`);
            } else {
                updateSql += updateSql ? (`, ${key} = ${val}`) : (`${key}  = ${val}`);
            }
        }
    }
    console.log(updateSql,"updateSql")
    ctx.body = await execute(`UPDATE ${ctx.dbName} SET ${updateSql} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}