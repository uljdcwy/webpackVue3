const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const fs = require("fs");
const path = require("path");
module.exports = merge(common,{
    entry: () => {
        return new Promise(async (resolve) => {
            const dirList = fs.readdirSync(path.resolve(__dirname + "/pages"));
            let entryObj = {};
            dirList.map(function (e, i) {
                entryObj[e.split('.')[0]] = [path.resolve(__dirname + "/pages/" + e)]
            });

            resolve(entryObj);
        });
    },
    mode: 'production',
})