var path = require("path");
var webpack = require("webpack");

module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
  entry: {
    vendor: ['vue', 'lodash', 'vuex', 'axios', 'vue-router', 'element-plus']
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "MyDll.[name].js",
    library: "[name]_[fullhash]"
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[fullhash]',
      path: path.join(__dirname, 'manifest.json'),
    }),
  ]
};