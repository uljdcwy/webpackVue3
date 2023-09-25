import { execute } from "../mysql";
import { getUuid } from "../utils/uuid";
import { getSaveDir } from "../utils/checkFile"
import fs from "fs";
// 新增中间件
export const addMiddle = async (ctx) => {
    try {
        let data = await addSql(ctx);
        console.log(data, "data")
        ctx.body = {
            code: 1,
            msg: '',
            data
            
        };
    } catch (e) {
        ctx.body = { code: 0, msg: '新增失败' };

    }
}
// 指量新增中间件
export const addManyMiddle = async (ctx) => {
    try {
        ctx.body = {
            code: 1,
            msg: "",
            data: await addManySql(ctx)
        };
    } catch (e) {
        ctx.body = { code: 0, data: null, msg: '新增失败' };

    }
}
// 新增方法
export const addSql = async (ctx) => {
    // 获取新增参数
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "新增参数");
    let keys: string = '';
    let values: string = '';
    // 循环参数 并拼接
    for (let key in params) {
        let val = params[key];
        if (typeof val == 'string') {
            val = val.replace(/(\\*)(")/g, (str, $1, $2) => {
                if ($1 && $2) {
                    return '\\'.repeat($1.length + 1) + '"'
                } else {
                    return "\\" + $2
                }
            })
            values += values ? `, "${val}"` : `"${val}"`;
        } else {
            val = val ? `'${JSON.stringify(val)}'` : val;
            values += values ? `, ${val}` : val;
        }
        keys += keys ? (', ' + key) : key;
    }
    // 执行新增sql
    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, []);
}
// 批量新增方法
export const addManySql = async (ctx) => {
    // 获取批量新增的参数
    let manyParams = ctx.request.body;
    console.info(JSON.stringify(manyParams), "批量新增参数");
    let keys: string = '';
    let values: string = '';
    // 循环参数
    manyParams.forEach((el: any, index: number) => {
        // 拼接SQL语句
        values += !values ? ' VALUES(' : ', (';
        let startStatus = false;
        for (let key in el) {
            let val = el[key];
            if (index == 0) { keys += keys ? (', ' + key) : key; }
            if (typeof val == 'string') {
                values += startStatus ? `, '${val}'` : `'${val}'`;
            } else {
                val = val ? `'${JSON.stringify(val)}'` : val;
                values += startStatus ? `, ${val}` : val;
            }
            startStatus = true;
        }
        values += ')'
    })
    // 执行批量新增 sql
    return await execute(`INSERT INTO ${ctx.dbName}(${keys})${values}`, []);
}
// 添加JSON，代替SQL的方法添加方法
export const addJsonFile = async (ctx) => {
    let id = getUuid();
    // 获取新增参数
    let params: any = ctx.request.body;
    params.id = id;
    let saveDir = getSaveDir('database');
    
    // 保存的文件
    let saveFile = `${saveDir}/${ctx.dbName}.js`;
    let fileContent;
    if(fs.existsSync(saveFile)){
        fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
    }else{
        fileContent = [];
    }

    fileContent.push(params);
    fs.writeFileSync(saveFile, JSON.stringify(fileContent), 'utf-8');
    
    ctx.body = {
        code: 1,
        data: {
            insertId: id
        },
        msg: ""
    }
}