# 项目介绍

本项目对标龙泉名酒网，是专门为酒类爱好人士提供线上线下销售的一款软件产品，包括 系统管理后台 和 移动端应用 两部分。其中系统管理后台主要提供给酒类企业内部员工使用，可以对酒的分类、品种、订单、员工等进行管理维护。移动端应用主要提供给消费者使用，可以在线浏览商品、添加购物车、下单等。

# 技术栈

vue2 vue-router vuex axios sass element-ui webpack

# 本地运行

npm i
npm run serve

# 项目打包

npm run build

# 项目目录

- api 接口封装
- assets 静态文件
- components 组件封装
- data 静态数据
- lang 国际化数据
  - en 英文
  - zh 中文
- router 路由配置
- store vuex 配置
- styles 样式配置
  - base.scss sass 变量以及函数
  - reset.css 初始化样式
  - element-variables.scss elementui 样式配置
- utils 工具函数配置
- views 页面配置
  - errorPage 错误页面
  - goods 商品管理
  - operation 运营管理
  - orders 订单管理
  - DashBoard 欢迎页
  - Home 主页
  - login 登录页
- main.js 入口文件
- .eslintrc.js 代码规范
- .gitignore git 配置
- vue.config.js vue 配置文件
