import { createRouter, createWebHashHistory } from "vue-router"

const test = () => import("@/test.vue");

const routes = [
    { path: '/', component: test },
]

export default createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});