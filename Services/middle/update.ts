import { execute, query } from "../mysql";

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

export const updateSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"更新参数");
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
    return await execute(`UPDATE ${ctx.dbName} SET ${updateSql} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}

export const updateManySql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params),"批量更新参数");
    let mainKeyArr: any = params.mainKeyArr;
    let updateSql: string = '';
    let updateData = params.updateData;
    let mainKey: any = ctx.mainKey || 'id';

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

    return await execute(`UPDATE ${ctx.dbName} SET${updateSql} WHERE ${mainKey} IN (${mainKeyArr})`);
}