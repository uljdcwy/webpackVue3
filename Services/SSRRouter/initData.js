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

/**
 * 
 * @param {string} HTMLTemplate 页面模版
 * @param {string} title 页面标题
 * @returns 
 */
const updateTitle = (HTMLTemplate, title) => {
    // 匹配标题正则
    const titleReg = new RegExp(`<title>[^(</)]*`)
    return HTMLTemplate.replace(titleReg,`<title>${title}`);
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
    routes.push(url);
    // 初始化数据
    let initData = getInitData();
    
    // 初始化页面标题
    let pageTitle = "";

    // @ts-ignore
    await new Promise((resolve, reject) => {
        routes.isReady().then(() => {
            // @ts-ignore
            pageTitle = routes.currentRoute._value.meta && routes.currentRoute._value.meta.title;
            resolve('')
        }).catch(reject)
    });
    console.log(pageTitle,"pageTitle")
    app._props = {
        initData
    };

    let html = await renderToString(app);
    html = HTMLTemplate.replace(`<div id="app" data-server-rendered="true"></div>`, `<div id="app" data-server-rendered="true">${html}</div>`);;
    if(pageTitle){
        html = updateTitle(html, pageTitle);
    }
    return updateInitStore(html, store, initData);
}