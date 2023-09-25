import { execute } from "../mysql";
import { getSaveDir } from "../utils/checkFile";
import fs from "fs";
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
    console.info(JSON.stringify(params), "删除参数");
    let mainKey: any = 'id';
    // 循环参数获取主键的值
    
    mainKey = params[ctx.mainKey];
    if (typeof mainKey == 'string') {
        // 执行SQL语句并返回
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} in(${mainKey})`, []);
    } else {
        // 执行SQL语句并返回
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} = ${mainKey}`, []);
    }
}

export const deleteJsonFile = async (ctx) => {
    let saveDir = getSaveDir('database');
    let deleteID = ctx.request.body.id;
    // 保存的文件
    let saveFile = `${saveDir}/${ctx.dbName}.js`;
    let fileContent;
    try {
        fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
        let hasDelete = false;
        fileContent.some((el, idx) => {
            if (el.id == deleteID) {
                fileContent[idx] = null;
                hasDelete = true;
                return true;
            }
        });
        fileContent = fileContent.filter((e) => e);

        fs.writeFileSync(saveFile, JSON.stringify(fileContent), 'utf-8');
        if(hasDelete){
            ctx.body = {
                code: 1,
                data: {
                    insertId: deleteID
                },
                msg: ""
            }
        }else{
            ctx.body = {
                code: 0,
                data: null,
                msg: "未查询到数据"
            }
        }
    } catch (e) {
        console.log(JSON.stringify(e),"查看删除错误");
        ctx.body = {
            code: 0,
            msg: "删除失败",
            data: null
        }
    };
}