import { execute } from "../mysql";
// 删除中间件
export const deleteMiddle = async (ctx, next) => {
    try {
        // 执行删除方法
        ctx.body = await deleteSql(ctx);
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: "删除失败",
            data: null
        }
    }
}
// 删除 单个的SQL方法
export const deleteSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"删除参数");
    let mainKey: any = 'id';
    // 循环参数获取主键的值
    for (let key in params) {
        if (key === ctx.mainKey) {
            mainKey = params[key];
            if (typeof mainKey == 'string') {
                mainKey = `"${mainKey}"`
            }
        }
    }
    // 执行SQL语句并返回
    return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}