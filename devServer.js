let http = require('http');

let express = require('express');

let app = express();

let webpack = require('webpack');
let webpackConfig = require('./webpack/webpack.dev');
let compiler = webpack(webpackConfig);
let instance = require('webpack-dev-middleware')(compiler);

app.use(instance);

app.use(
  require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);

app.use(express.static('./web'))

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(5000, "localhost", function () {
    console.log('Listening on %j', server.address());
  });
}