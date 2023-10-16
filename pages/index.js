import {
	createApp,
} from "vue"
// @ts-ignore
import App from "@/app.vue";
const app = createApp(App);



document.body.onload = function() {
	let div = document.createElement('div');
	div.id = "app";
	document.body.appendChild(div);
	app.mount(div)
};

/*#__PURE__*/ moduleHot()

function /*#__PURE__*/ moduleHot() {
	// @ts-ignore
	if (module?.hot) {
		// @ts-ignore
		module.hot.accept();
		// 热替换完成后逻辑
		// @ts-ignore
		module?.hot.dispose(function() {
		});
	}
}
