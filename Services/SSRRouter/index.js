// @ts-ignore
import Router from "koa-router";
import { initSSRHTML } from "./initData.js";

export const ssrRouter = new Router();

// @ts-ignore
ssrRouter.get("/", async (ctx, next) => {
    ctx.body = "123546";
});

ssrRouter.get("/:test", async (/** @type {{ body: string; }} */ ctx, /** @type {any} */ next) => {
    // @ts-ignore
    console.log(ctx.url,"ctx.url");
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url);
});


