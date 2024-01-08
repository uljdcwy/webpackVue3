// @ts-ignore
import Router from "koa-router";
import { initSSRHTML } from "./initData.js";
import { getListMiddle } from "./../middle/getList.js"

export const ssrRouter = new Router();

// @ts-ignore
ssrRouter.get("/", async (ctx, next) => {
    if(ctx.request.header.referer){
        ctx.body = "undefined data"
        return ;
    }
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url, ctx.query.lang || 'zh');
});

// @ts-ignore
ssrRouter.get("/:router", async (ctx, next) => {
    if(/\..+$/.test(ctx.url)){
        await next()
    }else{
        if(ctx.request.header.referer){
            ctx.body = "undefined data"
            return ;
        }
        // @ts-ignore
        ctx.body = await initSSRHTML(ctx.url, ctx.query.lang || 'zh');
    }
});


// @ts-ignore
ssrRouter.get("/admin/index", async (ctx, next) => {
    console.log("dbname adminindex");
    ctx.dbName = "adminindex";
    await next();
}, getListMiddle);


