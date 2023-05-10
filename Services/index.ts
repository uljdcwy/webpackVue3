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

app.use(staticFiles("./web"))



app.use(mount('/wx', wx.middleware())).use(wx.allowedMethods());

app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin;
  }
}));

app.listen(10015)