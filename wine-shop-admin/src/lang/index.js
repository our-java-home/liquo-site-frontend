/*
 * @Author: kongjingchao
 * @Date: 2023-05-23 17:25:43
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-05-23 17:25:43
 * @Description: 国际化配置
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n'; // ? npm install vue-i18n@8 必须是8版本，9版本不兼容element
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zh from './zh/index';
import en from './en/index';

Vue.use(VueI18n);
const i18n = new VueI18n({
  messages: {
    zh: {
      ...zh,
      ...zhLocale
    },
    en: {
      ...en,
      ...enLocale
    }
  },
  locale: sessionStorage.getItem('locale') || 'zh',
})
export default i18n;