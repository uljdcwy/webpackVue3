import { createI18n } from 'vue-i18n';
import { isClient } from '@/utils/utils.js';
import devData from '@/vueI18n/data.js';


/**
 * 
 * @param {string} locale 默认的语种 
 * @param {any} data 默认的数据
 * @returns 
 */
export const getI18n = (locale, data = null) => {
  let initData = data;

  if (isClient()) {
    initData = window._INIT_I18N_ || data;
  }

  if(process.env.NODE_ENV == "development"){
    initData = devData
  }

  return createI18n({
    locale: 'zh',
    allowComposition: true,
    messages: initData
  })
} 