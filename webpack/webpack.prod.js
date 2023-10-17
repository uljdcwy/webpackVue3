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
/**
 * @type {any}
 */
const PLUS = [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
    filename: './css/[name].css',
})]
module.exports = merge(common, webConfig, {
    entry: async () => {
        let pages = await new Promise((resolve) => {
            const dirList = fs.readdirSync(path.resolve(basePath + "/pages"));
            /**
             * @type {any}
             */
            let entryObj = {};
            dirList.map(function (e, i) {
                entryObj[e] = [path.resolve(basePath + "/pages/" + e)]
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
    plugins: PLUS,
    output: {
        publicPath: "",
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
                    test: /[\\/]node_modules[\\/]/,
                    /**
                     * @param {{ context: string; }} module
                     */
                    name(module) {
                        let regExp = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                        const packageName = regExp && regExp[1];

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