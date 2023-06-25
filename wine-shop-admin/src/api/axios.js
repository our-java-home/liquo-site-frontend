/*
 * @Author: kongjingchao 
 * @Date: 2023-06-17 10:33:15 
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-06-17 10:33:35
 * @Description: axios配置
 */

import axios from 'axios';
export const BASEURL = process.env.VUE_APP_BASEURL;

// 创建axios实例化对象，并配置
const service = axios.create({
  baseURL: 'BASEURL', //根路径，自动加在url前面，除非url是一个绝对路径
  timeout: 300000, //请求超时时间，如果超时则请求将会中断
  method: 'GET', //请求方式，默认get
  url: '', //请求路径
  // 自定义请求头
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + 'xxx' // token
  },
  // 发送请求前，修改数据
  transformRequest: (data) => {
    return JSON.stringify(data);
  },
  // 接收数据前，修改数据
  transformResponse: (data) => {
    return data;
  },
  // 和url一起发送的数据
  params: {},
  // 作为请求体发送的数据
  data: {}
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 显示加载动画
    return config;
  },
  (error) => {
    // 隐藏加载动画
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (res) => {
    // 隐藏加载动画
    const data = res.data;
    /* 
        判断token是否过期
        res.headers.xx,如果过期就跳转登陆页
    */
    return data;
  },
  (error) => {
    // 隐藏加载动画
    return Promise.reject(error);
  }
);

/*
 * 封装get请求
 * @param {string} url
 * @param {string} param
 * @return {Promise}
 */

export function get(url, param) {
  return new Promise((resolve, reject) => {
    service({
      method: 'GET',
      url: url,
      params: param,
      transformRequest(data) {
        return data;
      }
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

/*
 * 封装post请求
 * @param {string} url
 * @param {JSON} param
 * @return {Promise}
 */

export function post(url, param) {
  return new Promise((resolve, reject) => {
    service({
      method: 'POST',
      url: url,
      data: param,
      transformRequest(data) {
        return data;
      }
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
