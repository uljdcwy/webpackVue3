import {
	createApp,
} from "vue"
import appContent from "@/app.vue";

import router from "@/router/index"
import { ElButton } from "element-plus"


import('@wasm/factorial.wasm').then(function(res){
	let val = res._Z4facti(5);
	console.log(val)
})

const app = createApp(appContent);




app.use(router).use(ElButton)

document.body.onload = function() {
	let div = document.createElement('div');
	div.id = "app";
	document.body.appendChild(div);
	app.mount(div)
};

/*#__PURE__*/ moduleHot()

function /*#__PURE__*/ moduleHot() {
	if (module?.hot) {
		module.hot.accept();
		// 热替换完成后逻辑
		module?.hot.dispose(function() {
		});
	}
}
