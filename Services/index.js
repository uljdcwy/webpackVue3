import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import mount from "koa-mount";
import bodyParser from "koa-bodyparser";
import staticFiles from "koa-static";
import axios from "axios";

const app = new Koa();
const wx = new Router();

app.use(bodyParser({}));

app.use(staticFiles("./web", {
  maxage: 600000,
  extensions: ['appcache'],
  setHeaders: (res, path) => {
    if(path.search(/.appcache/) > -1){
      res.setHeader('Content-Type', 'text/cache-manifest')
    }
  }
}))



app.use(mount('/wx', wx.middleware())).use(wx.allowedMethods());

app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin || "";
  }
}));

app.listen(10015)