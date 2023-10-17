const path = require("path");
let basePath = process.cwd();

module.exports = {
  resolve: {
    extensions: ['.js', '.mjs', '.vue', '.ts', '.node', '.d.ts', '.json'],
    alias: {
      '@': path.resolve(basePath, './src/'),
      '@wasm': path.resolve(basePath, './wasmModule/'),
      '@node': path.resolve(basePath, './nodeModule/'),
      '@public': path.resolve(basePath, './public/'),
      '@api': path.resolve(basePath, './moduleApi/'),
    },
    modules: ['../webpackPlugins', '../webpackLoads', 'node_modules'],
    fallback: {
      'path': false
    },
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    cacheDirectory: path.resolve(basePath, '.temp_cache'),
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(basePath, './webpackLoads')],
  },
  plugins: [],
  module: {
    rules: [
      {
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
          path.resolve(basePath, './src'),
          path.resolve(basePath, './self_modules'),
          path.resolve(basePath, './pages')
        ]
      },
      {
          test: /\.wasm$/,
          type: 'webassembly/async',
      },
      {
          test: /\.node$/,
          use: ['node-loader'],
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
    ],
  }
}