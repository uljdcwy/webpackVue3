import { execute, query } from "../mysql";
// 更新中间件
export const updateMiddle = async function (ctx, next) {
    try{
        ctx.body = {
            code: 1,
            msg: '',
            data: await updateSql(ctx)
        }
    }catch(e){
        ctx.body = {
            code: 0,
            msg: '',
            data: null
        }
    }
}
// 批量更新中间件
export const updateManyMiddle = async (ctx) => {
    try{
        ctx.body = {
            code: 1,
            msg: '',
            data: await updateManySql(ctx)
        }
    }catch(e){
        ctx.body = {
            code: 0,
            msg: '',
            data: null
        }
    }
}
// 更新的方法
export const updateSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"更新参数");
    let mainKey: any = 'id';
    let updateSql: string = '';
    // 拼接参数
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
    // 执行更新SQL
    return await execute(`UPDATE ${ctx.dbName} SET ${updateSql} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}
// 批量更新的方法
export const updateManySql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"批量更新参数");
    let mainKeyArr: any = params.mainKeyArr;
    let updateSql: string = '';
    let updateData = params.updateData;
    let mainKey: any = ctx.mainKey || 'id';
    // 循环批量拼接批量更新SQL
    for(let key in updateData){
        let val = updateData[key];
        if(updateSql){
            updateSql += `, ${key} = CASE ${mainKey}`
            for(let i = 0; i < mainKeyArr?.length; i++){
                if (typeof val == 'string') {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN '${val}'`
                } else {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN ${val}`
                }
            }
            updateSql += ` END`
        }else{
            updateSql += ` ${key} = CASE ${mainKey}`
            for(let i = 0; i < mainKeyArr?.length; i++){
                if (typeof val == 'string') {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN '${val}'`
                } else {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN ${val}`
                }
            }
            updateSql += ` END`
        }
    }

    mainKeyArr = mainKeyArr.join(',')
    // 执行更新sql语句
    return await execute(`UPDATE ${ctx.dbName} SET${updateSql} WHERE ${mainKey} IN (${mainKeyArr})`);
}