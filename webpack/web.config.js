const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
let basePath = process.cwd();
module.exports = {
  target: "web",
  output: {
      filename: './js/[name].js',
      path: path.resolve(basePath, "web"),
      clean: true,
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
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