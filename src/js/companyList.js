import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
var vmData = {
	searchType:1,
	currPage:1,
	keyword:'',
	isPageEnd:false,
	companys:[]
};
export default{
	name:'companyList',
	data(){
		return vmData;
	},
	created:function(){
		var self =this;
		self.companys = [];
		self.keyword = '';
		if(this.$route.params.keyword !="" && this.$route.params.keyword !="null"){
			self.keyword=this.$route.params.keyword;
		};
		self.getCompanyList(1);
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
		getCompanyList(type){
			var self = this,
				url = 'Buyer/v2/Checkcompany/search/',
				data = {
					type:self.searchType,
					keyword:self.keyword,
					currPage:self.currPage
				},
				response = self.ajaxCommon(url,data).responseJSON;
				console.log(response);
				if(response.status == 1){
				if(response.pages==self.currPage){
					self.isPageEnd = true;
				}
				response.result.map(function(item,index){
						self.companys.push(item);
					});
				//console.log('self.products',self.products);
				//self.products=response.result;
				}else{
					console.log("请求失败");
				}
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
					that.getCompanyList(that.type);
				}
					
			}
		},
		goSearch(){
			this.$router.push({path:'/search/'});
		},
		choseSearchType(type){//选择查询条件 综合 or 新品
			$('body,html').animate({scrollTop:0},0);
			var self =this;
			self.currPage = 1;
			self.searchType = type;
			self.companys = [];
			self.getCompanyList(type);
		},
		goBack(){
			this.$router.back()
		}
	}
}