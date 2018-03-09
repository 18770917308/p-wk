# test-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

1.src->assets 存放项目所需图片

2.src->components->common 自定义的通用组件 dialogue弹出框 isEnd加载到最后一页的提示 share百度分享

3.src->components->company 公司主页 公司介绍

4.src->components->wk-index.vue 首页

4.src->css 各组件单独的css样式文件 base.css为通用样式

5.src->js  各组件单独的js文件

6.src->router->index.js 路由配置文件

注：本vue项目采用的为淘宝镜像 启动时应 'cnpm'而不是'npm' 