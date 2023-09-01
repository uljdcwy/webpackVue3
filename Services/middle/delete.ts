import { execute } from "../mysql";
// 删除中间件
export const deleteMiddle = async (ctx) => {
    try {
        // 执行删除方法
        ctx.body = {
            code: 1,
            msg: "",
            data: await deleteSql(ctx)
        };
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
    
    mainKey = params[ctx.mainKey];
    if (typeof mainKey == 'string') {
        // 执行SQL语句并返回
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} in(${mainKey})`, []);
    }else{
        // 执行SQL语句并返回
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} = ${mainKey}`, []);
    }
}