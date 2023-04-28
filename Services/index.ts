import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import { createDB, query, execute } from "./mysql";
import mount from "koa-mount";
import bodyParser from "koa-bodyparser";
import { getListMiddle } from "./middle/getList"
import { addMiddle, addManyMiddle } from "./middle/add"
import { updateMiddle } from "./middle/update";
import { deleteMiddle } from "./middle/delete"

const app = new Koa();
const router = new Router();

app.use(bodyParser())

router.post("/createDB", async function (ctx, next) {
  ctx.body = await createDB('Test');
}).get("/getTest", async function (ctx, next) {
  ctx.dbName = 'test1';
  await next();
}, getListMiddle).post("/add", async function (ctx, next) {
  ctx.dbName = 'test1';
  await next();
}, addMiddle).post("/update", async (ctx, next) => {
  ctx.dbName = 'test1';
  ctx.mainKey = 'id';
  await next();
}, updateMiddle).post('/delete', async (ctx, next) => {
  ctx.dbName = 'test1';
  ctx.mainKey = 'id';
  await next();
}, deleteMiddle).get('/area/get', async (ctx, next) => {
  ctx.dbName = 'area';
  await next();
}, getListMiddle).post('/area/add', async (ctx, next) => {
  ctx.dbName = 'area';
  await next();
}, addMiddle).post('/area/addMany', async (ctx, next) => {
  ctx.dbName = 'area';
  await next();
}, addManyMiddle).put('/area/update', async (ctx, next) => {
  ctx.dbName = 'area';
  ctx.mainKey = 'id';
  await next();
}, updateMiddle).delete('/area/delete', async (ctx, next) => {
  ctx.dbName = 'area';
  ctx.mainKey = 'id';
  await next();
}, deleteMiddle).get('/person/get', async (ctx, next) => {
  ctx.dbName = 'person';
  await next();
}, getListMiddle).post('/person/add', async (ctx, next) => {
  ctx.dbName = 'person';
  let params = ctx.request.body;
  await next();
}, addMiddle).put('/person/update', async (ctx, next) => {
  ctx.dbName = 'person';
  ctx.mainKey = 'id';

  let params = ctx.request.body;
  await next();
}, updateMiddle).delete('/person/delete', async (ctx, next) => {
  ctx.dbName = 'person';
  ctx.mainKey = 'id';

  await next();
}, deleteMiddle).post('/pay', async (ctx, next) => {
  
  
  ctx.body = {

  }

})
app.use(mount('/venue', router.middleware())).use(router.allowedMethods());

app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin;
  }
}))

app.listen(3000)