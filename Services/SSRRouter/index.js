// @ts-ignore
import Router from "koa-router";
import { initSSRHTML } from "./initData.js";

export const ssrRouter = new Router();

// @ts-ignore
ssrRouter.get("/", async (ctx, next) => {
    // @ts-ignore
    console.log(ctx.url,"ctx.url");
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url);
});

ssrRouter.get("/:test", async (/** @type {{ body: string; }} */ ctx, /** @type {any} */ next) => {
    // @ts-ignore
    console.log(ctx.url,"ctx.url");
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url);
});

ssrRouter.get("/test/:name", async (/** @type {{ body: string; }} */ ctx, /** @type {any} */ next) => {
    // @ts-ignored 路由名称

    let name = ctx.params.name
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url);
});


