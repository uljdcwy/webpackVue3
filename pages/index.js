import { createApp } from "vue";
import app from "@/app.vue"

document.body.onload = async function() {
	console.info(app)
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(123)
		}, 3000)
	})
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
