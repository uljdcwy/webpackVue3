import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient, importVueFail } from "@/utils/utils";
// @ts-ignore
import page404 from "@/components/404/index.vue";

// @ts-ignore
const index = () => import("@/views/index.vue").catch(importVueFail);
// @ts-ignore
const test = () => import("@/views/test.vue").catch(importVueFail);


const routes = [
    { path: '/', component: index, meta: {title: "标题首页"}  },
    { path: '/test', name: "test", component: test, meta: {title: "标题测试页"} },
    { path: '/:catchAll(.*)', name: '404', component: page404, meta: {title: "页面丢失了"} }
];

export const router = () => {
    let isClientStatus = isClient();
    let routers =  createRouter({
        history: isClientStatus ? createWebHistory() : createMemoryHistory(),
        routes,
    });
    if(isClientStatus){
        routers.beforeEach((to,from,next) => {
            next();
        });
    
        routers.afterEach((to, from) => {
            // 路由进入后
        });
    }

    return routers;
}


