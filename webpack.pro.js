const path = require("path");
const fs = require("fs");
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
console.log(config,"config")

module.exports = (env) => {
    let mergeObj = merge(config,{
    });

    console.log(mergeObj,"mergeObj")

    return mergeObj;
}