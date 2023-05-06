import { createRouter, createWebHashHistory } from "vue-router"

const index = () => import("@/views/index.vue");

const routes = [
    { path: '/', component: index },
]

export default createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});