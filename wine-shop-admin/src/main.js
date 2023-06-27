/*
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:29:33 
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-06-17 10:32:57
 * @Description: 入口文件
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './components/index';  // 全局组件
import './assets/index';  // svg
import './styles/element-variables.scss';

// 国际化(后期需要可以配置)
import i18n from './lang/index';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
