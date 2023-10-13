import mysql2 from "mysql2";
import config from "./DBConfig.js"
import { SqlFunction } from "./serverType.js"

const pool = mysql2.createPool(config);

process.on('exit', async (code) => {
    try{
        pool.end();
    } catch(e) {
        console.warn(JSON.stringify(e), '关闭连接池失败: ',code)
    }
});

export const createDB = (DBName) => {
    return new Promise((resolve, reject) => {
        const connection = mysql2.createConnection(config);
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

export const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, function (err, results, fields) {
            if (err) {
                console.error(JSON.stringify(err));
                reject(err);
                return;
            } else {
                console.info(results,"结果集");
                resolve(results || []);
            }
        });
    })
};

export const execute = (sql, params) => {
    
    return new Promise((resolve, reject) => {
        pool.execute(sql, params, function (err, results, fields) {
            if (err) {
                console.error(JSON.stringify(err));
                reject(err);
                return;
            } else {
                console.info(results,"结果集");
                resolve(results || []);
            }
        });
    })
}
