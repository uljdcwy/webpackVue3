import { execute } from "../mysql";

export const addMiddle = async (ctx) => {
    try {
        ctx.body = {
            code: 1,
            msg: '',
            data: await addSql(ctx),
            
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
        ctx.body = { code: 0,data: null, msg: '新增失败' };

    }
}

export const addSql = async (ctx) => {
    let params = ctx.request.body;
    let keys: string = '';
    let values: string = '';
    for (let key in params) {
        let val = params[key];
        if (typeof val == 'string') {
            values += values ? `, "${val}"` : `"${val}"`;
        } else {
            values += values ? `, ${val}` : val;
        }
        keys += keys ? (', ' + key) : key;
    }

    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, []);
}

export const addManySql = async (ctx) => {
    let manyParams = ctx.request.body;
    let keys: string = '';
    let values: string = '';
    manyParams.forEach((el: any, index: number) => {
        values += !values ? ' VALUES(' : ', (';
        let startStatus = false;
        for (let key in el) {
            let val = el[key];
            if (index == 0) { keys += keys ? (', ' + key) : key; }
            if (typeof val == 'string') {
                values += startStatus ? `, '${val}'` : `'${val}'`;
            } else {
                values += startStatus ? `, ${val}` : val;
            }
            startStatus = true;
        }
        values += ')'
    })

    return await execute(`INSERT INTO ${ctx.dbName}(${keys})${values}`, []);
}