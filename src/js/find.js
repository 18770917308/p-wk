import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
var vmData = {
	currPage1:1,//头条当前页
	currPage2:1,//求购当前页
	news:[],
	buyData:[],
	isPageEnd1:false,//头条尾页
	isPageEnd2:false,//求购尾页
	findModule:2,//发现的模块 1猜你喜欢 2微库头条 3附近企业  4求购中心
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
		isEnd
	},
	mounted () {
		//监听滚动
    	window.addEventListener('scroll',this.wScroll); 
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
				switch(self.findModule){
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
		getComData(){},
		choseModule(type){
			var self = this;
			self.findModule = type;
			switch(type){
				case 1: self.getLikeData();break;
				case 2: self.getNewsData();break;
				case 3: self.getComData();break;
				case 4: self.getBuyData();break;
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
		}
	}
}