var http = require('http');

var express = require('express');

var app = express();

// Step 1: Create & configure a webpack compiler
var webpack = require('webpack');
var webpackConfig = require('./webpack.config')({
  ENV: "development",
  target: "web"
});
var compiler = webpack(webpackConfig);
let instance = require('webpack-dev-middleware')(compiler);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(instance);

// Step 3: Attach the hot middleware to the compiler & the server
app.use(
  require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);

// Do anything you like with the rest of your express application.
app.use(express.static('./web'))

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(5000, "localhost", function () {
    console.log('Listening on %j', server.address());
  });
}