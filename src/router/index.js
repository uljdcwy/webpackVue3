import { createRouter, createWebHashHistory } from "vue-router"
import test from "@/test.vue"


const routes = [
    { path: '/', component: () => import("@/test.vue") },
]

export default createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});