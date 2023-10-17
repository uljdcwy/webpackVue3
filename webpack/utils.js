const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
let basePath = process.cwd();
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
module.exports = {
    getEnv: () => {
        let argv = process.argv;
        let o = {};
        for (let i = 0; i < argv.length; i++) {
            if (argv[i].search("=") > -1) {
                let arr = argv[i].split("=")
                // @ts-ignore
                o[arr[0]] = arr[1]
            }
        };
        return o;
    },
    /**
     * @param {{ ENV: string; target: string; }} env
     * @param {any[]} PLUS
     */
    getEntry(env, PLUS) {
        let isDev = env.ENV == 'development';
        let isPreload = env.target == "electron-preload";
        let pages = new Promise((resolve) => {
            const dirList = fs.readdirSync(path.resolve(basePath + (isPreload ? "/preloads" : "/pages")));
            let entryObj = {};
            dirList.map(function (e, i) {
                let currentPage = [];
                if (isDev) {
                    currentPage.push(hotScript);
                }
                currentPage.push(path.resolve(basePath + (isPreload ? "/preloads/" : "/pages/") + e));
                // @ts-ignore
                entryObj[e.split('.')[0]] = currentPage
            });
            resolve(entryObj);
        });

        if (env.target != "electron-preload") {
            // 获取所有页面并将HTML插件模版引入
            pages.then(function (/** @type {{}} */ res) {
                Object.keys(res).map(function (el) {
                    PLUS.push(
                        new HtmlWebpackPlugin({
                            template: path.resolve(basePath, './template.html'),
                            filename: el + '.html',
                            chunks: [el],
                            hash: true,
                            title: "车牌识别资料集",
                            CDNList: [],
                            isStaticCss: []
                        })
                    );

                });
            });
        };
        return pages;
    }
}