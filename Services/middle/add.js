import { execute } from "../mysql";
import { getUuid } from "../utils/uuid";
import { getSaveDir } from "../utils/checkFile"
import * as fs from "fs";
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
export const addSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "新增参数");
    let keys = '';
    let values = '';
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
    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, []);
}
export const addManySql = async (ctx) => {
    let manyParams = ctx.request.body;
    console.info(JSON.stringify(manyParams), "批量新增参数");
    let keys = '';
    let values = '';
    manyParams.forEach((el, index) => {
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
    return await execute(`INSERT INTO ${ctx.dbName}(${keys})${values}`, []);
}
export const addJsonFile = async (ctx) => {
    let id = getUuid();
    let params = ctx.request.body;
    params.id = id;
    let saveDir = getSaveDir('database');
    
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