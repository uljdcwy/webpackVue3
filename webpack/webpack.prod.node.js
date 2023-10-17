const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require("fs");
/**
 * @type {any}
 */
const webConfig = require('./web.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let basePath = process.cwd();
const dirList = fs.readdirSync(path.resolve(basePath + "/pages"));
/**
 * @type {any}
 */
const PLUS = [
    new MiniCssExtractPlugin({
        filename: './css/[name].css',
    })
]
dirList.map(function (el) {
    // @ts-ignore
    el = /(.+)\.js$/.exec(el)[1];
    PLUS.push(
        new HtmlWebpackPlugin({
            template: path.resolve(basePath, './template.html'),
            filename: el + '.html',
            chunks: [el, 'common'],
            hash: true,
            title: "车牌识别资料集",
            CDNList: [],
            isStaticCss: []
        }));

})

PLUS.push(new CompressionPlugin())
module.exports = merge(common, {
    // @ts-ignore
    entry: {
        index: "./Services/index"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(basePath, "node"),
        publicPath: "",
        clean: true,
    },
    target: "node",
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true
        })],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                verdors: {
                    test: /[\\/]node_modules[\\/]/,
                    /**
                     * @param {{ context: string; }} module
                     */
                    name(module) {
                        //取得名称。例如 /node_modules/packageName/not/this/part.js
                        // 或 /node_modules/packageName
                        let regExp = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                        const packageName = regExp && regExp[1];

                        // npm package 是 URL 安全的，但有些服务不喜欢 @ 符号
                        return `npm.${packageName?.replace('@', '')}`;
                    },
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    priority: 0,
                    minSize: 0
                }
            }
        }
    },
});