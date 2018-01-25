import $ from 'jquery'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import dialogue from '@/components/common/dialogue'
var vmData = {
	productDetail:{},
	pH5:'',
	isH5:false,
	isPlaying:false,
	hasVideo:false,
	swiperOption: {
	      			loop:false,
	      			sildesPerView:'auto',
	      			speed:500,
	      			grabCursor: true,
	      			pagination : '.swiper-pagination',
			        autoplayDisableOnInteraction : false,
			        paginationClickableickable :true,
			        observeParents:true
	      	},
	isShowDia:false
};
export default{
	name:'productDetail',
	data(){
		return vmData;
	},
	created:function(){
		var self = this;
		self.isH5 = false;
		self.hasVideo = false;
		self.getProductDetail();
	},
	mounted(){
		if(this.hasVideo){
			var $myVideo =$("#p-video").get(0),
			self = this;
			$myVideo.onplaying = function(){
				self.isPlaying = true;
			};
			$myVideo.onpause = function(){
				self.isPlaying = false;
			};
		}
	},
	components:{
		swiper,
		swiperSlide,
		dialogue
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
		getProductDetail(){//获取产品详情
			var self = this,
				url = 'Buyer/v2/Product/info/',
				data = {
					id:self.$route.params.id
				},
				response = self.ajaxCommon(url,data).responseJSON;
				//console.log("产品详情",response);
				if(response.status == 1){
					self.productDetail = response.result;
					//console.log(response.result.video);
					var index1 = response.result.video.lastIndexOf("."),
						index2 = response.result.video.lastIndexOf(".").length,
						fileType = response.result.video.substring(index1,index2);
						//console.log(fileType);
					if(fileType==".rm" || fileType==".rmvb" || fileType==".avi" || fileType==".mp4" || fileType==".3gp"){
						self.hasVideo = true;
					}

				}else{
					console.log("请求出错");
				}
		},
		getH5Page(){//获取产品详情h5
			var self = this,
				url = 'index.php/Buyer/Product/infoH5/',
				data = {
					id:self.$route.params.id
				},
				response = self.ajaxCommon(url,data);
				console.log("H5",response);
				self.pH5 = response.responseText;
				
		},
		changeView(type){//详情&产品 切换
			if(type==1){
				this.isH5 = false;
			}else if(type==2){
				this.isH5 = true;
				this.getH5Page();
			}
		},
		videoPlayAndStop(){//视频播放控制
			var $myVideo = $("#p-video").get(0),
				self = this;
			if(self.isPlaying){
				$myVideo.pause();
			}else{
				$myVideo.play();
			}
			self.isPlaying = !self.isPlaying;

		},
		goBack(){//返回上一页
			this.$router.back()
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