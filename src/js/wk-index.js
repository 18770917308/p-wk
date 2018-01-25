import $ from 'jquery'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import axios from 'axios'
import isEnd from '@/components/common/isEnd'
import dialogue from '@/components/common/dialogue'
var vmData = {
			indexObj1:[],
			recPro:[],
			recCompany:[],
			isCom:false,//是否显示推荐企业
			productPage:1,//初始页码1 产品
			companyPage:1,//初始页码1 企业
			isPageEnd1:false,//产品是否加载到最后一页
			isPageEnd2:false,//企业是否加载到最后一页
			isLoadingMore:false,//
			msg:"暂无更多推荐",
			swiperOption: {
	      			loop:true,
	      			autoplay:2000,
	      			sildesPerView:'auto',
	      			speed:500,
	      			grabCursor: true,
			        autoplayDisableOnInteraction : false,
			        pagination : '.swiper-pagination',
			        paginationClickableickable :true,
			        observeParents:true,
	      			onSlideChangeEnd: swiper =>{
	      				//swiper的回调方法
	      				this.page = swiper.realIndex+1;
	      				this.index=swiper.realIndex;
	      			}
	      	},
	      	isShowDia:false
		};
export default {
	name: 'wkIndex',
	data(){
		return vmData
		
	},
	created:function(){
		this.recProd();
		this.getAdv();
		this.recComp();
	},
	components: {
		swiper,
		swiperSlide,
		isEnd,
		dialogue
	},/*
	computed: {
		swiper() {
			return this.$refs.mySwiper1.swiper;
		}
	},*/
	mounted () {  
	    		var that = this;
    			if(that.swiperOption){
    				//this.swiper.slideTo(0, 0, true);
    			//
    			setInterval(function() {
    				that.swiper;
    				//that.swiper.slideNext();slideNext会报错？
    			},2500)
    			};
    			//监听滚动
    			window.addEventListener('scroll',that.wScroll);
  			},
	methods:{
		ajaxCommon(url,datas){//ajax通用
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
		wScroll(){
			var that = this,
				scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    					innerHeight = document.body.clientHeight,
    					offsetHeight = document.body.scrollHeight;
    					that.isLoadingMore=true;
    				if(scrollTop + innerHeight >= offsetHeight) {
    					if(that.isCom && !that.isPageEnd2){
    						that.companyPage=that.companyPage+1;
    						//console.log('请求的下一页:',that.companyPage);
    						that.recComp();
    					}else if(!that.isCom && !that.isPageEnd1){
    						that.productPage= that.productPage+1;
    						that.recProd();
    					}
    				}
		},
		getAdv(){//请求 banner
				var self=this,
					url = 'Buyer/v2/index/index/',
					response=self.ajaxCommon(url).responseJSON;
					//console.log('广告：',response);
					if(response.status==1){
						self.indexObj1=response.result;
					}else{
						//console.log("请求出错！")
					}
			},/*
		getAdv_c(){
			var self = this;
			axios.post(self.baseUrl+'Buyer/v2/index/index/').then(function(response){
				console.log(response);
			})
		},*/
		recProd(){//请求推荐产品
				var self=this,
					url = 'Buyer/v2/index/recommend/',
					data={page:self.productPage},
					response=self.ajaxCommon(url,data).responseJSON;
					//console.log('推荐产品：',response);
					if(response.status==1){
						if(response.pages==self.productPage){
							self.isLoadingMore=false;
							self.isPageEnd1 = true;
						}
						for(var item in response.result){
							self.recPro.push(item);
						}
						self.recPro=response.result;
					}else{
						//console.log("请求出错！")
					}
		},
		recComp(){//请求推荐企业
			var self=this,
				url = 'Buyer/v2/index/factory/',
				data={page:self.companyPage},
				response=self.ajaxCommon(url,data).responseJSON;
					//console.log('推荐企业：',response);
				if(response.status==1){
					if(response.pages==self.companyPage){
							self.isPageEnd2 = true;
							self.isLoadingMore=false;
					}
					response.result.map(function(item,index){
						self.recCompany.push(item);
					});/*
					self.recCompany=response.result;*/
					//console.log("下拉加载加载后的企业：",self.recCompany);
				}else{
					//console.log("请求出错！")
				}
		},
		recToggle(msg){//推荐切换
			var self=this;
			switch(msg){
				case 'product':
					self.isCom=false;
					break;
				case 'company':
					self.isCom=true;
					break;
				default: alert("参数错误！");
			}
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
		}
	}
}