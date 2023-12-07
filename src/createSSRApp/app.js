import { createSSRApp } from 'vue';
// @ts-ignore
import aLink from "@/components/aLink/index.vue";
// @ts-ignore
import App from "@/app.vue";
import { router } from '@/router'
import store from '@/store';

export const createApp = () => {
    const app = createSSRApp(App);
    const routes = router();

    app.component('aLink',aLink);
    
    app.use(store);
    app.use(routes);

    return { app, routes, store }
}
