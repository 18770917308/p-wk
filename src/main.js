// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './css/normalize.css'
import './css/base.css'
import loading from 'assets/icon/img-loading.gif'
Vue.use(vueLazyLoad,{
	preLoad:1.3,
	loading:loading,
	attempt:1,
})
Vue.use(VueAwesomeSwiper)
//判断设备类型
var deviceUa = navigator.userAgent.toLowerCase(); 
var device;
if (/iphone|ipad|ipod/.test(deviceUa)) {
      device = "iphone";
} else if(/android/.test(deviceUa)) {
      device = "android";
}
//
Vue.prototype.baseUrl= 'http://apis.wkmill.com:8066/';
Vue.prototype.device = device;
Vue.config.productionTip = false

//路由跳转后自动回到顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
    if(to.name=="companyHome" && from.name){
    	window.location.reload();
    }
    $(".bdsharebuttonbox").css({
        "zIndex":"-1",
        "visibility":"hidden"
      });
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
