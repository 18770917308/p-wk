import { swiper, swiperSlide} from 'vue-awesome-swiper'
var lists = ["css","html",'router'],
	user = {
		userName:"阿三",
		age:"20",
		sex:"boy",
		country:"印度"
	};
export default {
  'name': 'hello',
  data(){
		return {
			lists:lists,user:user,msg:"欢迎",id:"12345",timer:null,
			lbt1: [  
		        {  
		          'imgs': '../../src/assets/image/img1.jpg',
		          'id': '001'  
		        }, {  
		          'imgs': '../../src/assets/image/img4.jpg',
		          'id': "002"  
		        }, {  
		          'imgs': '../../src/assets/image/img5.jpg',
		          'id': "003"  
		        }  
      		],
      		parentsMsg: '父组件内容',
      		swiperOptions: {
      			loop:true,
      			autoplay:2500,
      			sildesPerView:'auto',
      			speed:500,
      			notNextTick:true,
      			direction: 'horizontal',
      			grabCursor: true,
		        autoplayDisableOnInteraction : false,
		        pagination : '.swiper-pagination1',
		        paginationClickable :true,
		        prevButton: '.swiper-button-prev1',
		        nextButton: '.swiper-button-next1',
		        observeParents:true,
      			onSlideChangeEnd: swiper =>{
      				//swiper的回调方法
      				this.page = swiper.realIndex+1;
      				this.index=swiper.realIndex;
      			}
      		}
		};
	},
	components: {
		swiper,
		swiperSlide
	},
	computed: {
		swiper() {
			if(this.swiperOptions){
				return this.$refs.mySwiper1.swiper;
			}
			
		}
	},
	mounted () {  
    			var that = this;
    			if(that.swiperOptions){
    				this.swiper.slideTo(0, 0, true);
    			//
    			that.timer=setInterval(function() {
    				that.swiper.slideNext();
    			},2500)
    			}
    			
  			},
  	methods: {
  		hideDiv(){
  			alert("all");
  		},
  		alertIt(){
  			alert("HI!");
  		},
  		deleteOpt(){
  			clearInterval(this.timer);
  		}
  	}

}