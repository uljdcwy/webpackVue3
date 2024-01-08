import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient, importVueFail } from "@/utils/utils";
import { getData } from "@/utils/getI18nData";
import { getPageI18nName } from "@/utils/getI18nData.js"
// @ts-ignore
import page404 from "@/components/404/index.vue";

// @ts-ignore
const index = () => import("@/views/index.vue").catch(importVueFail);
// @ts-ignore
const test = () => import("@/views/test.vue").catch(importVueFail);


const routes = [
    { path: '/', name: "index", component: index },
    { path: '/test', name: "test", component: test },
    { path: '/:catchAll(.*)', name: '404', component: page404 }
];


export const router = () => {
    let isClientStatus = isClient();
    let routers = createRouter({
        history: isClientStatus ? createWebHistory() : createMemoryHistory(),
        routes,
    });
    if (isClientStatus) {
        /**
         * @type {any}
         */
        const i18nData = {};
        routers.beforeEach((to, from, next) => {
            if (to.query.lang) {
                localStorage.setItem("lang", to.query.lang.toString());
                window.i18n.global.locale = to.query.lang;
            };

            // @ts-ignore
            const toI18nName = getPageI18nName(to.path);
            const messages = JSON.parse(JSON.stringify(window.i18n.global.messages));


            let defaultLang = Object.keys(messages)[0];
            console.log(messages[defaultLang][toI18nName],"messages[defaultLang][toI18nName]")
            if (messages[defaultLang][toI18nName]) {
                next();
            } else {
                getData(to.name).then((res) => {
                    // @ts-ignore
                    i18nData[to.name] = res.data.data || {};

                    // window.i18n.setLocaleMessage(lang, messages.default);
                    next();
                }).catch((err) => {
                    if (process.env.NODE_ENV == "development") {
                        next();
                        return;
                    }
                    next("/404");
                });
            };
        });

        routers.afterEach((to, from, next) => {
        });
    };
    return routers;
}


// @ts-ignore
const adminIndex = () => import("@/viewsAdmin/index.vue").catch(importVueFail);
const adminRoutes = [
    { path: '/', name: "adminIndex", component: adminIndex },
    { path: '/:catchAll(.*)', name: '404', component: page404 }
];

export const adminRouter = () => {
    const adminRoute = createRouter({
        history: createWebHashHistory(),
        routes: adminRoutes,
    });
    return adminRoute
}


