const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webConfig = require('./web.config.js');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(webConfig,"webConfig")
module.exports = merge(common, webConfig, {
    plugins: [
        new CompressionPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        })
    ],
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
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    }
});