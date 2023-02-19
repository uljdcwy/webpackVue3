const path = require("path");
const fs = require("fs");

module.exports = (env) => {
    return {
        entry: () => {
            return new Promise((resolve) => {
                const dirList = fs.readdirSync(path.resolve(__dirname + "/pages"));
                let entryObj = {};
                dirList.map(function (e, i) {
                    entryObj[e.split('.')[0]] = [path.resolve(__dirname + "/pages/" + e)]
                });
                resolve(entryObj);
            });
        },
        target: 'web',
        mode: env?.production ? 'production' : 'development',
        resolve: {
            fallback: {
                'path': false
            },
        },
        resolveLoader: {
            modules: ['node_modules', path.resolve(__dirname, 'webpackLoads')],
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    use: ['clearPrint'],
                },
            ],
        },
        output: {
            filename: './js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    }
}