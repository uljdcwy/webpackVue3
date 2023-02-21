const path = require("path");
const fs = require("fs");
// HTML插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 调用并发插件
// const HappyPack = require('happypack');
const {VueLoaderPlugin} = require('vue-loader');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
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
    pages.then(function (res) {
        Object.keys(res).map(function (el) {
            PLUS.push(
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, './template.html'),
                    filename: el + '.html',
                    chunks: [el],
                })
            );
        });
    });

    // 样式文件地址
    PLUS.push(new MiniCssExtractPlugin({
        filename: './css/[name].css',
    }));

    // VUE加载插件
    PLUS.push(new VueLoaderPlugin());

    let webpackObj = {
        // 构建为web应用
        target: env.target,
        cache: {
            type: 'filesystem',
            allowCollectingMemory: true,
        },
        // 配置静态引用
        externals: {
            // vue 为模块名  $vue 为引入全局变量
            'vue$': 'vue/dist/vue.esm.js',
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
                // 加载 .vue 文件
                {
                    test: /\.vue$/,
                    use: ['cache-loader', 'vue-loader'],
                },
                {
                    // JS加载
                    test: /\.js$/i,
                    use: (env.ENV == 'production') ? ['cache-loader',"thread-loader", {
                        loader: 'clear-print'
                    }, {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }] : ['cache-loader',"thread-loader"],// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'self_modules'),
                        path.resolve(__dirname, 'pages')
                    ]
                },
                {
                    // scss加载
                    test: /\.(sc|c|sa|)ss$/i,
                    use: ['cache-loader', (env.ENV == 'production') ? MiniCssExtractPlugin.loader : 'style-loader',"thread-loader", 'css-loader', 'sass-loader', 'postcss-loader'],// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    // less加载
                    test: /\.(le|c)ss$/i,
                    use: ['cache-loader', (env.ENV == 'production') ? MiniCssExtractPlugin.loader : 'style-loader',"thread-loader", 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 16 * 1024, // 4kb
                        },
                    },
                    generator: {
                        filename: 'images/[hash][ext][query]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 16 * 1024, // 4kb
                        },
                    },
                    generator: {
                        filename: 'font/[hash][ext][query]',
                    },
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
    if ((env.ENV == 'development')) {
        Object.assign(webpackObj, {
            devtool: 'source-map',
            mode: "development"
        })
        // 生产环境
    } else if ((env.ENV == 'production')) {
        Object.assign(webpackObj, {
            mode: "production",
            optimization: {
                minimize: true,
                minimizer: [new TerserPlugin({
                    parallel: true
                })],
                splitChunks: {
                    chunks: 'all', // 表示要分割的chunk类型：initial只处理同步的; async只处理异步的；all都处理
                    // 缓存分组
                    cacheGroups: {
                        // 第三方模块
                        verdors: {
                            name: 'verdor', // chunk名称
                            test: /node_modules/,  // 设置命中目录规则
                            priority: 1, // 优先级，数值越大，优先级越高
                            minSize: 0, // 小于这个大小的文件，不分割
                            minChunks: 1 // 最少复用几次，这里意思是只要用过一次就分割出来
                        },
                        // 公共模块
                        common: {
                            name: 'common',
                            minChunks: 2,
                            priority: 0,
                            minSize: 0,
                            minChunks: 2  // 只要引用过2次，就分割成公共代码
                        }
                    }
                }
            }
        })
        // 默认环境
    }
    return webpackObj;
}