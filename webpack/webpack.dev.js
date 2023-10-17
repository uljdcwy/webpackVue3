const { merge } = require('webpack-merge');
const webpack = require("webpack");
const path = require("path");
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DevHtml = require("../webpackPlugins/webpack5Dev");
const fs = require("fs");
/**
 * @type {any}
 */
const webConfig = require('./web.config.js');
let basePath = process.cwd();
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
/**
 * @type {any}
 */
let PLUS = [new DevHtml(), new webpack.HotModuleReplacementPlugin()];
module.exports = merge(common, webConfig, {
    // @ts-ignore
    entry: async () => {
        let pages = await new Promise((resolve) => {
            const dirList = fs.readdirSync(path.resolve(basePath + "/pages"));
            let entryObj = {};
            dirList.map(function (e, i) {
                /**
                 * @type {any}
                 */
                let currentPage = [hotScript];
                currentPage.push(path.resolve(basePath + "/pages/" + e));
                // @ts-ignore
                entryObj[e.split('.')[0]] = currentPage
            });
            resolve(entryObj);
        });

        Object.keys(pages).map(function (el) {
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
        return pages;
    },
    devtool: 'source-map',
    mode: "development",
    plugins: PLUS,
    output: {
        publicPath: "/",
    },
    module: {
        rules: [

            {
                // scss加载
                test: /\.(sc|sa|)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, './src')
                ]
            },
            {
                // less加载
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, 'src')
                ]
            },
            {
                // 静态CSS加载
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],// 'clear-print',
            }
        ]
    }
});