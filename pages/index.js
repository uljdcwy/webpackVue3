import {
	createApp,
	h
} from "vue"
import appContent from "@/app.vue";

import { createStore } from 'vuex'

import router from "@/router/index.js"
import { ElButton } from "element-plus"

const app = createApp(appContent);


console.log(router,"router")

// 创建一个新的 store 实例
const store = createStore({
	state () {
		return {
			count: 0
		}
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}
})

app.use(router).use(store).use(ElButton)

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
