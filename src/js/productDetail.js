import $ from 'jquery'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
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
			        autoplayDisableOnInteraction : false,
			        paginationClickableickable :true,
			        observeParents:true
	      	}
};
export default{
	name:'productDetail',
	data(){
		return vmData;
	},
	created:function(){
		this.hasVideo = false;
		this.getProductDetail();
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
		swiperSlide
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
		getProductDetail(){
			var self = this,
				url = 'Buyer/v2/Product/info/',
				data = {
					id:self.$route.params.id
				},
				response = self.ajaxCommon(url,data).responseJSON;
				console.log("产品详情",response);
				if(response.status == 1){
					self.productDetail = response.result;
					console.log(response.result.video);
					var index1 = response.result.video.lastIndexOf("."),
						index2 = response.result.video.lastIndexOf(".").length,
						fileType = response.result.video.substring(index1,index2);
						console.log(fileType);
					if(fileType==".rm" || fileType==".rmvb" || fileType==".avi" || fileType==".mp4" || fileType==".3gp"){
						self.hasVideo = true;
					}

				}else{
					console.log("请求出错");
				}
		},
		getH5Page(){
			var self = this,
				url = 'index.php/Buyer/Product/infoH5/',
				data = {
					id:self.$route.params.id
				},
				response = self.ajaxCommon(url,data);
				console.log("H5",response);
				self.pH5 = response.responseText;
				
		},
		changeView(type){
			if(type==1){
				this.isH5 = false;
			}else if(type==2){
				this.isH5 = true;
				this.getH5Page();
			}
		},
		videoPlayAndStop(){
			var $myVideo = $("#p-video").get(0),
				self = this;
			if(self.isPlaying){
				$myVideo.pause();
			}else{
				$myVideo.play();
			}
			self.isPlaying = !self.isPlaying;

		}
	}
}