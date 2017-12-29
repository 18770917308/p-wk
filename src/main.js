// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import contact from '@/components/Contact'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './css/normalize.css'
import './css/wk-index.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.component('contact', contact)//  全局注册一个组件
//prop用法示例
//①main.js中注册组件
//②组件js作为child的父组件 通过props将值传递给child
//③引用组件 父组件中的值改变时 会将变化传递给子组件
Vue.component('child', {
  props: ['message'],
  template: '<span>{{message}}</span>'
})
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{todo.text}}</li>'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
