const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const DevHtml = require("./webpackPlugins/webpack5Dev");
// HTML插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 调用并发插件
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require("terser-webpack-plugin");
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const CopyPlugin = require("copy-webpack-plugin");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = (env) => {
    // 命名用promise 调多页
    let pages;
    let isDev = env.ENV == 'development';
    let isCDN = false;
    let splitAllNpm = false;
    let isCDNList = {
    };
    let notCDNList = {
    }

    let isStaticCss = {
    }

    let CNDJSList = isCDN ? isCDNList : notCDNList;

    // HTML插件数组
    let PLUS = [];
    if (env.target == "web" || env.target == "electron-renderer" || env.target == "electron-preload") {
        let isPreload = env.target == "electron-preload";
        pages = new Promise((resolve) => {
            const dirList = fs.readdirSync(path.resolve(__dirname + (isPreload ? "/preloads" : "/pages")));
            let entryObj = {};
            dirList.map(function (e, i) {
                let currentPage = [];
                if (isDev) {
                    currentPage.push(hotScript);
                }
                currentPage.push(path.resolve(__dirname + (isPreload ? "/preloads/" : "/pages/") + e));
                entryObj[e.split('.')[0]] = currentPage
            });
            resolve(entryObj);
        });

        if (env.target != "electron-preload") {
            console.log('开始使用HTML插件', path.resolve(__dirname, './template.html'))
            // 获取所有页面并将HTML插件模版引入
            pages.then(function (res) {
                Object.keys(res).map(function (el) {
                    PLUS.push(
                        new HtmlWebpackPlugin({
                            template: path.resolve(__dirname, './template.html'),
                            filename: el + '.html',
                            chunks: [el],
                            title: "车牌识别资料集",
                            CDNList: CNDJSList,
                            isStaticCss: isStaticCss
                        })
                    );

                });
            });
        };

        // 样式文件地址
        PLUS.push(new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }));

        // VUE加载插件
        PLUS.push(new VueLoaderPlugin());

    } else if (env.target == "node") {
        splitAllNpm = true;
        pages = {
            index: "./Services/index"
        }
    }

    // PLUS.push(new webpack.DllReferencePlugin({
    //     context: path.join(__dirname, ".", "dll"),
    //     manifest: require('./manifest.json')
    // }));

    let webpackDeploy = {
        // 构建为web应用
        target: env.target,
        mode: env.ENV,
        cache: {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
            },
            cacheDirectory: path.resolve(__dirname, '.temp_cache'),
        },
        // 配置静态引用
        externals: env.target !== "node" ? Object.keys(isCDNList) : [],
        resolve: {
            // 依次尝试调用
            extensions: ['.js', '.mjs', '.vue', '.ts', '.d.ts', '.json'],
            // 使用导入时的路径别名
            alias: {
                '@': path.resolve(__dirname, './src/'),
                '@wasm': path.resolve(__dirname, './wasm/'),
            },
            // 先调么有模块 再调node模块
            modules: ['./webpackPlugins', './webpackLoads', 'node_modules'],
            // 防止webpack 5 特别的BUG
            fallback: {
                'path': false
            },
        },
        entry: () => {
            return pages;
        },
        experiments: {
            asyncWebAssembly: true,
            syncWebAssembly: true
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: ['vue-loader'],
                },
                {
                    test: /\.wasm$/,
                    type: 'webassembly/async',
                },
                {
                    test: /\.tsx?$/,    // .ts或者tsx后缀的文件，就是typescript文件
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true // 不使用语法检查TS，提升编译速度
                        },
                    }],   // 就是上面安装的ts-loader
                    exclude: "/node_modules/" // 排除node-modules目录
                },
                {
                    // scss加载
                    test: /\.(sc|sa|)ss$/i,
                    use: [(env.ENV == 'production') ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    // less加载
                    test: /\.less$/i,
                    use: [(env.ENV == 'production') ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
                    exclude: /(node_modules|public)/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ]
                },
                {
                    // 静态CSS加载
                    test: /\.css$/i,
                    use: [(env.ENV == 'production') ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],// 'clear-print',
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
            filename: (env.target == 'node' || env.target == 'electron-preload') ? '[name].js' : './js/[name].js',
            path: path.resolve(__dirname, env.target),
            publicPath: isDev ? "/" : "",
            clean: true,
        }
    };
    // 区分开发环境与生产环境
    if (isDev) {


        Object.assign(webpackDeploy, {
            devtool: 'source-map'
        });


        PLUS.push(new webpack.HotModuleReplacementPlugin());
        // 生成HTML文件的插件
        PLUS.push(new DevHtml());
        // 生产环境
    } else {

        let patterns = [];

        if (!isCDN) {
            for (let key in CNDJSList) {
                patterns.push({
                    from: CNDJSList[key],
                    to: "static/" + key
                });
            }
        }

        if (env.target == 'web') {
            for (let key in isStaticCss) {
                patterns.push({
                    from: isStaticCss[key],
                    to: "static/" + key
                });
            }

            patterns[0] && PLUS.push(new CopyPlugin({
                patterns: patterns,
            }));
        }

        webpackDeploy.module.rules.push({
            test: /\.js$/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            },// 'clear-print',
            exclude: /(node_modules|public)/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'self_modules'),
                path.resolve(__dirname, 'pages')
            ]
        });

        // PLUS.push(new BundleAnalyzerPlugin())


        Object.assign(webpackDeploy, {
            optimization: {
                minimize: true,
                minimizer: [new TerserPlugin({
                    parallel: true
                })],
                runtimeChunk: !splitAllNpm ? {
                    name: (entrypoint) => `runtime~${entrypoint.name}`,
                } : {},
                splitChunks: {
                    chunks: 'all', // 表示要分割的chunk类型：initial只处理同步的; async只处理异步的；all都处理
                    // 缓存分组
                    cacheGroups: {
                        // 第三方模块
                        verdors: !splitAllNpm ? {
                            name: 'verdor', // chunk名称
                            test: /node_modules/,  // 设置命中目录规则
                            priority: 1, // 优先级，数值越大，优先级越高
                            minSize: 0, // 小于这个大小的文件，不分割
                            minChunks: 1 // 最少复用几次，这里意思是只要用过一次就分割出来
                        } : {

                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                //取得名称。例如 /node_modules/packageName/not/this/part.js
                                // 或 /node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                                // npm package 是 URL 安全的，但有些服务不喜欢 @ 符号
                                return `npm.${packageName.replace('@', '')}`;
                            },
                        },
                        // element 单独拆包使用
                        elementUI: {
                            name: "elementUI", // 单独将 elementUI 拆包
                            priority: 5, // 权重需大于`vendor`
                            test: /[\/]node_modules[\/]element-plus[\/]/,
                            chunks: 'initial',
                            minSize: 100,
                            minChunks: 1
                        },
                        // koaRouter 单独拆包使用
                        koaRouter: {
                            name: "koaRouter", // 单独将 koaRouter 拆包
                            priority: 10, // 权重需大于`koaRouter`
                            test: /[\/]node_modules\/koa-router\//,
                            chunks: 'initial',
                            minSize: 0,
                            minChunks: 1
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
    };
    return webpackDeploy;
}