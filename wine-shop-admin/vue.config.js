/*
 * @Author: kongjingchao 
 * @Date: 2023-06-17 11:10:32 
 * @Last Modified by:   kongjingchao 
 * @Last Modified time: 2023-06-17 11:10:32
 * @Description: vue配置文件
 */

const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  pluginOptions: {
    // 全局样式导入
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/styles/base.scss']
    }
  },
  chainWebpack(config) {
    // 配置svg
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源的目录
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    // open: true, // 启动服务后是否打开浏览器
    // host: '', // 服务端IP地址
    // port: 8080, // 服务端口
    // https: false, // 是否启用https
    // hotOnly: false, // 是否开启热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, //跨域
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
