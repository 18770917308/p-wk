import $ from 'jquery'
import { swiper, swiperSlide} from 'vue-awesome-swiper'
let galleryTop  
let galleryThumbs 
var lists = ["css","html",'router'],
	user = {
		userName:"David",
		age:"20",
		sex:"boy",
		country:"USA"
	};
var childPart = {
	template: "<h3>局部注册的组件!</h3>"
}

export default {
  name: 'myTest',
  data: function(){
		return {
			lists:lists,
			hehe:'',
			no:false,
			user:user,
			lbt: [  
		        {  
		          'imgs': '../../src/assets/image/img1.jpg',
		          'id': '001'  
		        }, {  
		          'imgs': '../../src/assets/image/img4.jpg',
		          'id': '002'  
		        }, {  
		          'imgs': '../../src/assets/image/img3.jpg',
		          'id': '003'  
		        }
		      
      		],
      		sites: [
		    	{'text': 'aaa','id':1},
		    	{'text': 'bbb','id':2},
		    	{'text': 'ccc','id':3}
		    ],
      		swiperOption: {
      			loop:true,
      			autoplay:2500,
      			sildesPerView:'auto',
      			speed:500,
      			notNextTick:true,
      			grabCursor: true,
		        mousewheelControl : true,
		        autoplayDisableOnInteraction : false,
		        pagination : '.swiper-pagination',
		        paginationClickable :true,
		        prevButton: '.swiper-button-prev',
		        nextButton: '.swiper-button-next',
		        observeParents:true,
      			onSlideChangeEnd: swiper =>{
      				//swiper的回调方法
      				this.page = swiper.realIndex+1;
      				this.index=swiper.realIndex;
      			}
      		}
		}
		
	},
  	components: {
		swiper,
		swiperSlide,
		'part-child': childPart//局部注册组件
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	mounted () {  
    			var that = this;
    			if(that.swiperOptions){
    				this.swiper.slideTo(0, 0, true);
    			//
    			setInterval(function() {
    				that.swiper.slideNext();
    			},2500)
    			}
  			},
	methods:{
		getAlert(){
			$(".user").toggle();
			} ,
		},
	watch: {
		'user.userName': {
			handler:function(val,oldVal){
				console.log(val);
				console.log(oldVal);
			}
		}
	}

	}
