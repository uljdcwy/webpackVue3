/**
 * 
 * @param {string} html 通过 VUE 函数读取的字符
 * @param { {_state: {data : any}} } storeState  vuex 存储对象
 * @param { object } initData  初始化的data数据
 * @returns 
 */
export const updateInitStore = (html, storeState, initData = {}, i18n = {}) => {
	return html.replace(`<head>`,`
	<head><script type="text/javascript" id="initServerData">
		window._STORE_STATE_ = ${JSON.stringify(storeState._state.data)};
		window._INIT_DATA_ = ${JSON.stringify(initData)};
		window._INIT_I18N_ = ${JSON.stringify(i18n)};
		window.onlad = () => {
			let scripts = document.scripts;
			scripts[scripts.length - 1 ].onload = () => {
				scripts[0].remove();
			}
		}
	</script>`)
}