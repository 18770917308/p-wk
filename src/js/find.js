import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
import dialogue from '@/components/common/dialogue'
var vmData = {
	currPage1:1,//头条当前页
	currPage2:1,//求购当前页
	news:[],
	buyData:[],
	isPageEnd1:false,//头条尾页
	isPageEnd2:false,//求购尾页
	findModule:2,//发现的模块 1猜你喜欢 2微库头条 3附近企业  4求购中心
	isShowDia:false,
	nearbyCom:[],
	lng:'',//定位的经度 用于计算两地之间距离
	lat:'',//定位的纬度
	city:'',//定位的当前城市
};
export default{
	name: 'find',
	data(){
		return vmData;
	},
	created:function(){
		this.findModule = this.$route.params.module;
		this.getNewsData();
		this.getBuyData();
	},
	components:{
		isEnd,
		dialogue
	},
	mounted () {
		var self = this;
		//监听滚动
    	window.addEventListener('scroll',this.wScroll);
    	var mapObj = new AMap.Map('c_map');
    	mapObj.plugin('AMap.Geolocation', function () {
    		var geolocation = new AMap.Geolocation({
    			enableHighAccuracy: true,//是否使用高精度定位，默认:true
		        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		        maximumAge: 10000,           //定位结果缓存0毫秒，默认：0
		        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		        showButton: true,        //显示定位按钮，默认：true
		        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
		        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
		        zoomToAccuracy:true 
    		});

    		mapObj.addControl(geolocation);
		    geolocation.getCurrentPosition();
		     AMap.event.addListener(geolocation, 'complete', function(data) {
		        data.position.getLng() //定位成功返回的经度
		        data.position.getLat() //定位成功返回的纬度
		        self.lng = data.position.getLng();
		        self.lat = data.position.getLat();
		        self.city = data.addressComponent.city;
		    }); //返回定位信息
		    AMap.event.addListener(geolocation, 'error', function(data) {
		        if (data.info == 'FAILED') {
		            alert('获取您当前位置失败！')
		        }
		    });
    	});
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
		wScroll(){
			var self = this,
				scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
				innerHeight = document.body.clientHeight,
				offsetHeight = document.body.scrollHeight;
			if(scrollTop + innerHeight >= offsetHeight) {
				var module = Number(self.findModule);//地址栏传递为 string类型 switch判断时为 "===" 需 值和类型完全相等
				switch(module){
					case 2:
						if(!self.isPageEnd1){
						self.currPage1+=1;
						//console.log('请求的下一页:',self.currPage);
						self.getNewsData();
					};
					break;
					case 4:
						if(!self.isPageEnd2){
						self.currPage2+=1;
						//console.log('请求的下一页:',self.currPage);
						self.getBuyData();
					};
					break;
				}
					
			}
		},
		getNewsData(){//获取头条数据
			var self = this,
				url = 'index.php/Buyer/Find/newsList/',
				data = {currPage:self.currPage1},
				response = self.ajaxCommon(url,data).responseJSON;
			if(response.ststus == 1){
				if(response.pages==self.currPage1){
					self.isPageEnd1 = true;
				}
				response.result.map(function(item,index){
						item.inputtime = self.formatDate(item.inputtime+'000');
						self.news.push(item);
					});
			}else{
				console.log("请求失败");
			}
		},
		getBuyData(){//获取求购数据
			var self = this,
				url = 'Buyer/v2/Buy/buyList/',
				data = {currPage:self.currPage2},
				response = self.ajaxCommon(url,data).responseJSON;
				if(response.status == 1){
				if(response.pages==self.currPage2){
					self.isPageEnd2 = true;
				}
				response.result.map(function(item,index){
						self.buyData.push(item);
					});
			}else{
				console.log("请求失败");
			} 
		},
		getLikeData(){},
		getComData(){
			var self = this,
				url = 'index.php/buyer/nearby/index',
				data={address:self.city},
				response = self.ajaxCommon(url,data).responseJSON;
				//console.log(response);
			if(response.status == 1){
				self.nearbyCom = response.result;
				for(var i = 0;i<response.result.length;i++){
					response.result[i].distance = self.companyDistance(self.lng,self.lat,response.result[i].lng,response.result[i].lat);
				}
			}
		},
		choseModule(type){
			var self = this;
			self.findModule = type;
			switch(type){
				case 1: self.getLikeData();break;
				case 2:
					if(!self.news.length){
						self.getNewsData();
					}
					break;
				case 3: 
					if(!self.nearbyCom.length){
						self.getComData();
					}
				break;
				case 4: 
					if(!self.buyData.length){
						self.getBuyData();
					}
				break;
				default:alert("error");
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
		showDia(){//显示对话框
			this.isShowDia =true;
		},
		hideDialogue(){//隐藏对话框
			this.isShowDia =false;
		},
		downAPP(){//点击确定 下载APP 需判断设备类型 Android or iOS
			this.isShowDia =false;
		},
		getRad(d){
			var PI = Math.PI;
        	return d*PI/180.0;
    	},
		companyDistance(lng1,lat1,lng2,lat2){//根据两点的经纬度测算距离
			var EARTH_RADIUS = 6378137.0;
			var radLat1 = this.getRad(lat1);
	        var radLat1 = this.getRad(lat1);
	        var radLat2 = this.getRad(lat2);
	        var a = radLat1 - radLat2;
	        var b = this.getRad(lng1) - this.getRad(lng2);
	        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	        s = s*EARTH_RADIUS;
	        s = parseInt(Math.round(s*10000)/10000.0);
	        if(s>=10000){
	        	s='>10k'
	        }else if(s>1000 && s<10000){
	        	s = String((s/1000).toFixed(2))+'k';
	        }
	        return s;
		}
	}
}