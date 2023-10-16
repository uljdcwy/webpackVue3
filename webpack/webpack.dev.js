const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webConfig = require('./web.config.js');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(webConfig,"webConfig")
module.exports = merge(common, webConfig, {
    devtool: 'source-map'
});