import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient } from "@/utils/utils"

// @ts-ignore
const index = () => import("@/views/index.vue");
// @ts-ignore
const test = () => import("@/views/test.vue");

console.log(isClient(), "isClient")

const routes = [
    { path: '/', component: index, meta: {title: "标题首页"}  },
    { path: '/test', component: test, meta: {title: "标题测试页"} },
    { path: '/test1', component: test }
];


export const router = () => {
    let isClientStatus = isClient();
    let routers =  createRouter({
        history: isClientStatus ? createWebHistory() : createMemoryHistory(),
        routes,
    });

    routers.beforeEach((to,from,next) => {
        next();
    });

    return routers;
}


