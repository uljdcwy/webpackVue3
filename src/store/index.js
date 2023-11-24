// @ts-ignore
import { createStore } from 'vuex';

/**
 * initStore.name 为后台传过来的数据
 */
// @ts-ignore
const initStore = global._STORE_STATE_ || {};

export default createStore({
	state () {
		return {
		}
	},
	mutations: {
	}
})