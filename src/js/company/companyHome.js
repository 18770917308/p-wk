import $ from 'jquery'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import dialogue from '@/components/common/dialogue'
import share from '@/components/common/share'
var vmData = {
	type:1,//1全部产品 2新品上架
	products:null,
	comInf:null,
	isShowDia:false,
	c_swiperOption: {
	      			watchSlidesProgress: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					autoplay:1,
					loop: true,
					loopedSlides: 3,
					notNextTick: true,
	      			onSlideChangeEnd: swiper =>{
	      				//swiper的回调方法
	      				this.page = swiper.realIndex+1;
	      				this.index=swiper.realIndex;
	      			}
	      			
	      	},
};
export default{
	name:'companyHome',
	data(){
		return vmData;
	},
	components:{
		dialogue,
		swiper,
		swiperSlide,
		share
	},
	created:function(){
		this.type = 3;
		this.getCompanyProduct(1);
		this.getComInf();
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper1.swiper;
		}
	},
	mounted(){
		let _this = this;
		_this.swiper.on('progress',progress=>{
			for (var i = 0; i < progress.slides.length; i++) {
				var slide = progress.slides.eq(i);
				var slideProgress = progress.slides[i].progress;
				var modify;
				if (Math.abs(slideProgress) > 1) {
					modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
				}
				var translate = slideProgress * modify * 30 + 'px';
				var scale = 1 - Math.abs(slideProgress) / 2+0.3;
				if(scale>1) scale=1;
				if(scale<0.7) scale = 0;
				var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
				slide.transform('translateX(' + translate + ') scale(' + scale + ')');
				slide.css('zIndex', zIndex);
				slide.css('opacity', 1);
				if (Math.abs(slideProgress) > 2) {
					slide.css('opacity', 0);
				}
		};
	}),
		_this.swiper.on('setTransition',transition=>{
			//console.log(transition)
			for (var i = 0; i < transition.slides.length; i++) {
				var slide = transition.slides.eq(i);
				slide.transition(transition);
			}
			
		});
		if(_this.type==3){
			_this.swiper.startAutoplay();
			setTimeout(function(){
			_this.swiper.stopAutoplay();
		},1)
		}
		//分享
        this.$nextTick(function () {
            window._bd_share_config = {
                "common":{
                "bdSnsKey":{},
				"bdText":_this.products.companyname,
				"bdDesc":_this.products.companyname,
				"bdMini":"2",
				"bdPic":_this.products.logo,
				"bdStyle":"0",
				"bdUrl":"https://cn.vuejs.org/v2/guide/class-and-style.html",//分享的链接
				"bdSize":"32"},
				"share":{}
            };
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
        })
	},
	methods:{
		ajaxCommon(url,datas) { //ajax通用
		var baseUrl = this.baseUrl;
		return $.ajax({
				type:'POST',
				url:baseUrl+url,
				async: false,
				dataType:'json',
				data:datas||'',
				success:function(response){
					//console.log(response);
				},
				error:function(){
					//console.log("获取数据失败");
				}
			})
		},
		getCompanyProduct(type){//获取公司的产品列表
			var self =this,
				url = 'Buyer/v2/Checkcompany/index/',
				data = {
					comid:self.$route.params.id,
					type:type || self.type
				},
				response = self.ajaxCommon(url,data).responseJSON;
				if(response.status == 1){
					self.products = response.result;
					if(self.type==2){
						for(var i =0;i<self.products.product_list.length; i++){
							self.products.product_list[i].inputtime = self.formatDate(self.products.product_list[i].inputtime+'000');
						}
					}
				}else{
					console.log("请求出错");
				}
		},
		getComInf(){
			var self = this,
				url = 'Buyer/v2/Checkcompany/comIndex/',
				data = {
					comid:self.$route.params.id,
				},
				response = self.ajaxCommon(url,data).responseJSON;
				if(response.status == 1){
					self.comInf = response.result;
				}else{
					console.log("请求出错")
				}
		},
		formatDate(str){//日期格式化
			var date = new Date(),
				time;
			date.setTime(str);
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			time = year+'-'+month+'-'+day;
			return time;
		},
		selectType(type){
			this.type = type;
			if(type!=3){
				this.getCompanyProduct();
			}		
		},
		goBack(){
			this.$router.back()
		},
		goSearch(){//跳转至搜索
			this.$router.push({path:'/search'});
		},
		showDia(){//显示对话框
			this.isShowDia =true;
		},
		hideDialogue(){//隐藏对话框
			this.isShowDia =false;
		},
		downAPP(){//点击确定 下载APP 需判断设备类型 Android or iOS
			this.isShowDia =false;
		},
		goShare(){
			$(".bdsharebuttonbox").css({
				"zIndex":"223",
				"visibility":"visible"
			});
		},
		hideShare(){
			$(".bdsharebuttonbox").css({
				"zIndex":"-1",
				"visibility":"hidden"
			});
		}
	}
}