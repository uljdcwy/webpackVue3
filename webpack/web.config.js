const { getEnv, getEntry } = require("./utils.js");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
let env = getEnv();
let isDev = env.ENV == 'development';
let plugins = [new VueLoaderPlugin()];
let basePath = process.cwd();
module.exports = {
  entry: getEntry(env, plugins),
  output: {
      filename: (env.target == 'node' || env.target == 'electron-preload') ? '[name].js' : './js/[name].js',
      path: path.resolve(basePath, env.target || "web"),
      publicPath: isDev ? "/" : "",
      clean: true,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        // scss加载
        test: /\.(sc|sa|)ss$/i,
        use: [(env.ENV == 'production') ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } } : 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],// 'clear-print',
        exclude: /(node_modules|public)/,
        include: [
          path.resolve(basePath, './src')
        ]
      },
      {
        // less加载
        test: /\.less$/i,
        use: [(env.ENV == 'production') ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } } : 'style-loader', 'css-loader', 'less-loader', 'postcss-loader'],// 'clear-print',
        exclude: /(node_modules|public)/,
        include: [
          path.resolve(basePath, 'src')
        ]
      },
      {
        // 静态CSS加载
        test: /\.css$/i,
        use: [(env.ENV == 'production') ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: './' } } : 'style-loader', 'css-loader', 'postcss-loader'],// 'clear-print',
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
        test: /\.vue$/,
        use: ['vue-loader'],
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
      }
    ],
  }
}