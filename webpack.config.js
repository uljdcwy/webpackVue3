const path = require("path");
const fs = require("fs");
// HTML插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 调用并发插件
const HappyPack = require('happypack');
// 命名用promise 调多页
let pages = new Promise((resolve) => {
    const dirList = fs.readdirSync(path.resolve(__dirname + "/pages"));
    let entryObj = {};
    dirList.map(function (e, i) {
        entryObj[e.split('.')[0]] = [path.resolve(__dirname + "/pages/" + e)]
    });
    resolve(entryObj);
});


// HTML插件数组
let PLUS = [];
// 获取所有页面并将HTML插件模版引入
pages.then(function(res){
    Object.keys(res).map(function(el){
        PLUS.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './template.html'),
                filename: el + '.html',
                chunks: [el],
            })
        );
    });
})

// 并发插件数组
let concurrencyArr =  [{
    id: 'js',
    threads: 4,
    loaders: [ {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
    } ]
}];

concurrencyArr.map(function(el){
    console.log(el,123)
    PLUS.push(new HappyPack(el));
});


module.exports = (env) => {
    let webpackObj = {
        // 构建为web应用
        target: 'web',
        // 配置静态引用
        externals: {
            // vue 为模块名  $vue 为引入全局变量
            vue: "$vue"
        },
        resolve: {
            // 依次尝试调用
            extensions: ['.js', '.vue', '.json', '.ts'],
            // 使用导入时的路径别名
            alias: {
                '@': path.resolve(__dirname, './src/')
            },
            // 先调么有模块 再调node模块
            modules: ['./self_modules', 'node_modules'],
            // 防止webpack 5 特别的BUG
            fallback: {
                'path': false
            },
        },
        entry: () => {
            return pages;
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    use: "happypack/loader?id=js",// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'self_modules'),
                        path.resolve(__dirname, 'pages')
                    ]
                },
            ],
        },
        resolveLoader: {
            modules: ['node_modules', path.resolve(__dirname, 'webpackLoads')],
        },
        plugins: PLUS,
        output: {
            filename: './js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        }
    };
    // 区分开发环境与生产环境
    if(env.development){
        Object.assign(webpackObj,{
            devtool: 'source-map',
            mode: "development"
        })
    // 生产环境
    }else if(env.production){
        Object.assign(webpackObj,{
            mode: "production"
        })
    // 默认环境
    }else{

    }
    return webpackObj
}