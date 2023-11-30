import { createApp } from "@/createSSRApp/app.js"
import "@/scss/customize.scss";
import "@/scss/theme.scss";



if(process.env.NODE_ENV != "development"){
	window.onbeforeunload = function (e) {
		e = e || window.event
		if (e) {
			e.returnValue = '网站可能不会保存您的修改哦~'
		}
		return '网站可能不会保存您的修改哦~'
	}
}


document.body.onload = function() {

	const { app, routes, store } = createApp();
	
	routes.isReady().then(() => {
		
		// @ts-ignore
		let vm = app.mount('#app')
	})

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
