import { createApp } from "vue";
// @ts-ignore
import App from "@/app.vue"
const app = createApp(App)

alert(123)
document.body.onload = async function() {
	console.log(123456789)
	app.mount("#app");
};

/*#__PURE__*/ moduleHot()

function /*#__PURE__*/ moduleHot() {
	
	// @ts-ignore
	if (module?.hot) {
		// @ts-ignore
		module.hot.accept();
		// @ts-ignore
		module?.hot.dispose(function() {
		});
	}
}
