import { createRouter, createWebHashHistory } from "vue-router"

// @ts-ignore
const index = () => import("@/views/index.vue");

const routes = [
    { path: '/', component: index },
]

/**
 * @type {Tst}
 */
let test = 123465

export default createRouter({
    history: createWebHashHistory(),
    routes,
});