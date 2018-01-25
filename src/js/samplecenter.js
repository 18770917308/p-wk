import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
var vmData = {
	sample:[],
	currPage:1,
	isPageEnd:false,
	msg:"没有更多了"
};
export default{
	name:'samplecenter',
	data(){
		return vmData;
	},
	created:function(){
		this.getData();
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
						console.log("获取数据失败");
					}
				})
		},
		getData(){
			var self = this,
				url = 	'Buyer/v2/index/sample/',
				data = {page:self.currPage},
				response=self.ajaxCommon(url,data).responseJSON;
				//console.log('样品：',response);
				if(response.status==1){
					if(response.pages==self.currPage){
						self.isPageEnd = true;
					}
					response.result.map(function(item,index){
						self.sample.push(item);
					});
					//self.sample=response.result;
					//console.log('self.isPageEnd',self.isPageEnd);
				}else{
					//console.log("请求出错！")
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
					that.sample();
				}
					
			}
		},
		goBack(){
			this.$router.back()
		}
	}
}