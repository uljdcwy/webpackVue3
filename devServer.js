import http from "http";
import express from "express";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import Config from "./webpack.config.js";

let app = express();

let webpackConfig = Config({
  ENV: "development",
  target: "web"
});
let compiler = webpack(webpackConfig);
let instance = devMiddleware(compiler);

app.use(instance);

app.use(
  hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);

app.use(express.static('./web'))

var server = http.createServer(app);
server.listen(5000, "localhost", function () {
  console.log('Listening on %j', server.address());
});