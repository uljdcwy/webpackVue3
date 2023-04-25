import mysql2 from "mysql2";
import config from "./DBConfig"
import { SqlFunction } from "./serverType"

// 创建连接池
const pool = mysql2.createPool(config);

// 监听node退出事件
process.on('exit', async (code: any) => {
    try{
        pool.end();
    } catch(e) {
        console.warn(JSON.stringify(e), '关闭连接池失败: ',code)
    }
});

// 创建数据库
export const createDB: SqlFunction = (DBName: string) => {
    return new Promise((resolve, reject) => {
        // 创建一个数据库连接
        const connection = mysql2.createConnection(config);
        // 连接数据库如果连接成功创建数据库字符串
        connection.connect((err) => {
            if (err) {
                console.error(JSON.stringify(err));
                reject(err);
                return;
            }else {
                connection.query(`CREATE DATABASE IF NOT EXISTS ${DBName}`, (CreateErr, result) => {
                    if(CreateErr){
                        console.error(JSON.stringify(CreateErr))
                        reject(CreateErr);
                        return;
                    }else{
                        console.info(JSON.stringify(result))
                        resolve(result);
                        return ;
                    }
                })
            }
        })
    })
}

// 查询语句
export const query: SqlFunction = (sql, params) => {
    
    return new Promise((resolve, reject) => {
        // 简单查询
        pool.query(sql, params, function (err, results, fields) {
            if (err) {
                console.error(JSON.stringify(err));
                reject(err);
                return;
            } else {
                // let otherData = new Buffer(fields).toString();
                // if (otherData) {
                //     console.info(otherData,"额外的元数据", ); // 额外的元数据（如果有的话）
                //     console.info(results,"结果集"); // 结果集
                //     resolve([results, otherData]);
                //     return
                // }
                console.info(results,"结果集"); // 结果集
                resolve(results || []);
            }
        });
    })
};

// 插入更新操作语句
export const execute: SqlFunction = (sql, params) => {
    
    return new Promise((resolve, reject) => {
        // 简单查询
        (<any>pool).execute(sql, params, function (err, results, fields) {
            if (err) {
                console.error(JSON.stringify(err));
                reject(err);
                return;
            } else {
                // let otherData = new Buffer(fields).toString().trim();
                // if (otherData) {
                //     console.info(otherData,"额外的元数据", ); // 额外的元数据（如果有的话）
                //     console.info(results,"结果集"); // 结果集
                //     resolve([results, otherData]);
                //     return
                // }
                console.info(results,"结果集"); // 结果集
                resolve(results || []);
            }
        });
    })
}
