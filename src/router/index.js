import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient } from "@/utils/utils"

// @ts-ignore
const index = () => import("@/views/index.vue");
// @ts-ignore
const test = () => import("@/views/test.vue");

console.log(isClient(), "isClient")

const routes = [
    { path: '/', component: index },
    { path: '/test', component: test }
];


export const router = () => {
    return createRouter({
        history: isClient() ? createWebHistory() : createMemoryHistory(),
        routes,
    });
}


