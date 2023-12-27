import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient, importVueFail } from "@/utils/utils";
// @ts-ignore
import page404 from "@/components/404/index.vue";

// @ts-ignore
const index = () => import("@/views/index.vue").catch(importVueFail);
// @ts-ignore
const test = () => import("@/views/test.vue").catch(importVueFail);


const routes = [
    { path: '/', component: index, meta: {title: "标题首页", keywords: "这是keywords的内容", description: "这是description的内容"}  },
    { path: '/test', name: "test", component: test, meta: {title: "标题测试页", keywords: "这是kords的内容", description: "这是de的内容"} },
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
            if(to.query.lang){
                localStorage.setItem("lang", to.query.lang.toString());
                window.i18n.global.locale = to.query.lang;
            }
            next();
        });
    
        routers.afterEach((to, from, next) => {
            /**
             * @type {any}
             */
            let projectName = /-\s([^-]*)$/.exec(document.title);
            document.title = to.meta && to.meta.title + ' - ' + (projectName && projectName[1]);
            // 路由进入后
        });
    }

    return routers;
}


