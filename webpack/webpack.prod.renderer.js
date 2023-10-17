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
module.exports = merge(common, webConfig, {
    target: "electron-renderer",
    // @ts-ignore
    entry: () => {
        let entryObj = {};
        dirList.map(function (e, i) {
            // @ts-ignore
            entryObj[e.split('.')[0]] = [path.resolve(basePath + "/pages/" + e)]
        });
        return entryObj;
    },
    plugins: PLUS,
    output: {
        filename: './js/[name].js',
        path: path.resolve(basePath, "renderer"),
        publicPath: "",
        clean: true
    },
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
                    name: 'verdor', // chunk名称
                    test: /node_modules/,  // 设置命中目录规则
                    priority: 1, // 优先级，数值越大，优先级越高
                    minSize: 0, // 小于这个大小的文件，不分割
                    minChunks: 1 // 最少复用几次，这里意思是只要用过一次就分割出来
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
    module: {
        rules: [
            {
                // scss加载
                test: /\.(sc|sa|)ss$/i,
                use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } }, 'css-loader', 'sass-loader', 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, './src')
                ]
            },
            {
                // less加载
                test: /\.less$/i,
                use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } }, 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
                exclude: /(node_modules|public)/,
                include: [
                    path.resolve(basePath, 'src')
                ]
            },
            {
                // 静态CSS加载
                test: /\.css$/i,
                use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } }, 'css-loader', 'postcss-loader'],// 'clear-print',
            }
        ]
    }
});