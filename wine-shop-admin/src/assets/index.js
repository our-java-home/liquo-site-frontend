/*
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:32:14 
 * @Last Modified by:   kongjingchao 
 * @Last Modified time: 2023-06-17 10:32:14
 * @Description: svg配置
 */

import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';
// 注册到全局
Vue.component('svg-icon', SvgIcon);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);