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

1.运行项目 在cd命令到项目所在文件夹 cnpm run dev
2.创建组件 局部组件在所需的父组件中register就可以引用 全局组件在main.js中register
3.export default{
	'/path':'name',
	components: {
	component1,
	component2
}
}
4.router在index.js中进行配置
5.vue UI组件 vue-mui
6.iview https://www.iviewui.com/components/upload(UI组件)
7.radon-UI 支持图片上传预览 https://luojilab.github.io/radon-ui/#!
8.普通UI amazeui http://amazeui.org
