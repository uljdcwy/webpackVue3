import { execute, query } from "../mysql";

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

export const updateManyMiddle = async (ctx) => {
    let params = ctx.request.body;
    let mainKeyArr: any = params.mainKeyArr;
    let updateSql: string = '';
    let updateData = params.updateData;
    let mainKey: any = ctx.mainKey || 'id';

    for(let key in updateData){
        if(updateSql){
            updateSql += `, ${key} = CASE ${mainKey}`
            for(let i = 0; i < mainKeyArr.length; i++){
                updateSql += ` WHEN ${mainKeyArr[i]} THEN ${updateData[key]}`
            }
            updateSql += ` END`
        }else{
            updateSql += ` ${key} = CASE ${mainKey}`
            for(let i = 0; i < mainKeyArr.length; i++){
                updateSql += ` WHEN ${mainKeyArr[i]} THEN ${updateData[key]}`
            }
            updateSql += ` END`
        }
    }

    console.log(updateSql,"updateSql")
    mainKeyArr = mainKeyArr.join(',')

    ctx.body = await execute(`UPDATE ${ctx.dbName} SET${updateSql} WHERE ${mainKey} IN (${mainKeyArr})`);
}