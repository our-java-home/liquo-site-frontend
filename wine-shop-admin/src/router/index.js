/*
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:30:05 
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-06-17 10:52:05
 * @Description: 路由表
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', icon: 'home', meta: ['admin', 'editor'] },
    redirect: '/home/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/views/demo/index.vue'),
        redirect: '/home/demo/list',
        meta: { title: '演示', icon: 'demo', affix: true },
        children: [
          {
            path: 'list',
            name: 'demoList',
            component: () => import('@/views/demo/List'),
            meta: { title: '表格', icon: 'table', affix: true },
          },
          {
            path: 'form',
            name: 'demoForm',
            component: () => import('@/views/demo/Form'),
            meta: { title: '表单', icon: 'form', affix: true },
          }
        ]
      },
      {
        path: 'goods',
        component: () => import('@/views/goods/index.vue'),
        name: 'goods',
        meta: { title: '商品管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'operation',
        component: () => import('@/views/operation/index.vue'),
        name: 'operation',
        meta: { title: '运营管理', icon: 'dashboard', affix: true }
      },
      {
        path: 'orders',
        component: () => import('@/views/orders/index.vue'),
        name: 'orders',
        meta: { title: '订单管理', icon: 'dashboard', affix: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL
});

// 解决重复点击同一个路由时，控制台出现报错问题
// 报错内容：Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
VueRouter.prototype.replace = function replace(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router;
