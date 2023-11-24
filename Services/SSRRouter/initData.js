// @ts-ignore
import { renderToString } from 'vue/server-renderer';
import fs from "fs";
import { updateInitStore } from "./store.js";
// server.js (不相关的代码省略)
import { createApp } from '@/createSSRApp/app.js';
/**
 * @type { string } HTML字符串
 */
let HTMLTemplate;
try {
    HTMLTemplate = fs.readFileSync("./web/index.html").toString();
} catch (e) {
    HTMLTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>未找到文件</title></head><body>服务器错误未找到文件</body></html>`
    console.error("未放置打包文件到指定位置", JSON.stringify(e));
}
const getInitData = () => {
    return {
        textNumber: 123456
    };
}

// 初始化 SSR HTML数据
/**
 * 
 * @param {string} url 当前路由的路径 
 * @returns 
 */
export const initSSRHTML = async (url) => {
    const { app, routes, store } = createApp();

    // 设置服务器端 router 的位置
    console.log(routes.currentRoute,"router")
    routes.push(url);
    // 初始化数据
    let initData = getInitData();
    console.log(url,"url")

    // @ts-ignore
    await new Promise((resolve, reject) => {
        routes.isReady().then(() => {
            resolve('')
        }).catch(reject)
    })

    app._props = {
        initData
    };

    let html = await renderToString(app);
    html = HTMLTemplate.replace(`<div id="app" data-server-rendered="true"></div>`, `<div id="app" data-server-rendered="true">${html}</div>`);;
    return updateInitStore(html, store, initData);
}