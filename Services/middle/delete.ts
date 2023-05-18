import { execute } from "../mysql";

export const deleteMiddle = async (ctx, next) => {
    try {
        ctx.body = await deleteSql(ctx);
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: "删除失败",
            data: null
        }
    }
}

export const deleteSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"删除参数");
    let mainKey: any = 'id';

    for (let key in params) {
        if (key === ctx.mainKey) {
            mainKey = params[key];
            if (typeof mainKey == 'string') {
                mainKey = `"${mainKey}"`
            }
        }
    }

    return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}