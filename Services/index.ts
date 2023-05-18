import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import mount from "koa-mount";
import bodyParser from "koa-bodyparser";
import staticFiles from "koa-static";
import axios from "axios";
import { router } from "./routers/index"

const app = new Koa();
const wx = new Router();

app.use(bodyParser());

app.use(staticFiles("./web", {
  maxage: 600000,
  extensions: ['appcache'],
  setHeaders: (res: any, path: any) => {
    if(path.search(/.appcache/) > -1){
      // console.log(res.headers,res.Headers,"res.headers,res.Headers")
      // console.log("path",ctx['Content-Type'],ctx.setHeaders)
      // res[''] ='text/cache-manifest');
      res.setHeader('Content-Type', 'text/cache-manifest')
      // ctx.response.header['Content-Type'] = 'text/cache-manifest';
    }
  }
}))



app.use(mount('/wx', wx.middleware())).use(wx.allowedMethods());

app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin;
  }
}));

app.listen(10015)