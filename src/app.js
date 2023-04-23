// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'
import router from "./router/index.js";
import app from "./app.vue";

export function createApp() {
  return createSSRApp(app);
};
export const routers = router;