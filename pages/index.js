import {
	createApp,
	h
} from "vue"
import appContent from "@/app.vue"

const app = createApp(appContent);

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
