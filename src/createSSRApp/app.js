import { createSSRApp } from 'vue';
// @ts-ignore
import App from "@/app.vue";
import { router } from '@/router'
import store from '@/store'

export const createApp = () => {
    const app = createSSRApp(App);
    const routes = router();
    
    app.use(store);
    
    app.use(routes);

    return { app, routes, store }
}
