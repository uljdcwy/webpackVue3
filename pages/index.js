import {
	createApp,
	h
} from "vue"
import appContent from "@/app.vue";
import { createRouter, createWebHashHistory } from "vue-router"

const app = createApp(appContent);


const routes = [
	{ path: '/', component: import("@/test.vue") },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes, // `routes: routes` 的缩写
});

app.use(router)

document.body.onload = function() {
	let div = document.createElement('div');
	div.id = "app";
	document.body.appendChild(div);
	console.warn(app.mount)
	app.mount(div)
};


/*#__PURE__*/
moduleHot()

function /*#__PURE__*/ moduleHot() {
	if (module.hot) {
		module.hot.accept();
		// 热替换完成后逻辑
		module.hot.dispose(function() {
		});
	}
}
