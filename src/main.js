// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './css/normalize.css'
import './css/wk-index.css'
import './css/category.css'
import './css/samplecenter.css'
import './css/search.css'
import loading from 'assets/icon/img-loading.gif'
Vue.use(vueLazyLoad,{
	preLoad:1.3,
	loading:loading,
	attempt:1,
})
Vue.use(VueAwesomeSwiper)
Vue.prototype.baseUrl= 'http://apis.wkmill.com/';

Vue.config.productionTip = false

//路由跳转后自动回到顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
