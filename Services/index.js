import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import mount from "koa-mount";
import bodyParser from "koa-bodyparser";
import staticFiles from "koa-static";
import config from "./config.json" assert { type: 'json' };
import { getIP } from "./utils/getIP.js"
import axios from "axios";

const app = new Koa();
const wx = new Router();

app.use(bodyParser({}));

app.use(staticFiles("./web", {
  maxage: 600000,
  extensions: ['appcache'],
  setHeaders: (/** @type {{ setHeader: (arg0: string, arg1: string) => void; }} */ res, /** @type {string} */ path) => {
    if(path.search(/.appcache/) > -1){
      res.setHeader('Content-Type', 'text/cache-manifest')
    }
  }
}))



app.use(mount('/wx', wx.middleware())).use(wx.allowedMethods());

app.use(cors({
  origin: function (/** @type {{ header: { origin: any; }; }} */ ctx) {
    return ctx.header.origin || "";
  }
}));

app.listen(config.port, () => {
  console.log(`服务启用中 ${getIP()}:${config.port}`)
})