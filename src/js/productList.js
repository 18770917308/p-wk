import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
var vmData = {
	products : [],
	keyword:'',
	viewType:false,//列表模式切换
	searchType:1,//查看条件 1综合 2新品
	currPage:1,
	isPageEnd:false,
	isShowFilter:false,
	server:1,//服务保障筛选 1支持取样 2实地验厂
	time:1,//筛选时间 1--7天 2--30天 3--90天
	category:[],//分类
	catid:''//分类id
};
export default{
	name:'productList',
	data(){
		return vmData;
	},
	created:function(){
		var self =this;
		self.products = [];
		self.keyword = '';
		self.currPage = 1;
		self.isPageEnd = false;
		if(this.$route.params.keyword !="" && this.$route.params.keyword !="null"){
			self.keyword=this.$route.params.keyword;
		};
		self.getSearchRes(1);
		self.getCategory();
	},
	mounted () {
		//监听滚动
    	window.addEventListener('scroll',this.wScroll); 
	},
	components:{isEnd},
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
		getSearchRes(type){//获取搜索结果
			var self = this,
				url = 'Buyer/v2/product/productList/',
				data = {
					type:type,
					keyword:self.keyword,
					page:self.currPage	
				},
				response = self.ajaxCommon(url,data).responseJSON;
				//console.log(response);
			if(response.status == 1){
				if(response.pages==self.currPage){
					self.isPageEnd = true;
				}
				response.result.map(function(item,index){
						self.products.push(item);
					});
				//console.log('self.products',self.products);
				//self.products=response.result;
			}else{
				console.log("请求失败");
			} 
		},
		getCategory(){//获取分类
			var self = this,
				url = 'Buyer/v3/Category/index/',
				response = self.ajaxCommon(url);
				//console.log('分类：',response);
				if(response.responseJSON.status == 1){
					self.category = response.responseJSON.result;
				}else{
					//console.log("请求出错，请检查");
				}
		},
		choseSearchType(type){//选择查询条件 综合 or 新品
			$('body,html').animate({scrollTop:0},0);
			var self =this;
			self.currPage = 1;
			self.searchType = type;
			self.products = [];
			self.getSearchRes(type);
		},
		wScroll(){
			var that = this,
				scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    					innerHeight = document.body.clientHeight,
    					offsetHeight = document.body.scrollHeight;
    					//that.isLoadingMore=true;
			if(scrollTop + innerHeight >= offsetHeight) {
				if(!that.isPageEnd){
					that.currPage+=1;
					//console.log('请求的下一页:',that.currPage);
					that.getSearchRes(that.type);
				}
					
			}
		},
		viewTypeToggle(){//视图模式切换
			this.viewType = !this.viewType;
		},
		showFilter(){//显示筛选条件
			this.isShowFilter = true;
		},
		choseFilters(index1,id){//服务选择
			console.log('index1:',index1);
			console.log('id:',id);
			var self = this;
			switch(index1){
				case 0: self.server = id; break;
				case 1: self.time = id;break;
				case 2: self.catid = id;break;
				default: console.log("error");
			}
		},
		resetFilter(){//重置筛选条件
			var self = this;
			this.server = 0;
			this.time = 0;
			this.catid = 0;
		},
		getFilterResult(){//确定 筛选
			var self = this;
			self.currPage = 1;
			self.isShowFilter = false;
			self.products = [];
			var	url = 'Buyer/Product/productList/',
				data = {
					type:self.searchType,
					keyword:self.keyword,
					page:self.currPage,
					catid:self.catid,
					time:self.time,
					server:self.server
				},
				response = self.ajaxCommon(url,data).responseJSON;
				console.log(response);
			if(response.status == 1){
				if(response.pages==self.currPage){
					self.isPageEnd = true;
				}
				response.result.map(function(item,index){
						self.products.push(item);
					});
				//console.log('self.products',self.products);
				//self.products=response.result;
			}else{
				console.log("请求失败");
			} 
		},
		hideFilterMask(){
			this.isShowFilter = false;
		},
		goSearch(){
			this.$router.push({path:'/search/'});
		},
		goBack(){
			this.$router.back()
		}
	}
}