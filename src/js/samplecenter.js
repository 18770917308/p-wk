import $ from 'jquery'
import isEnd from '@/components/common/isEnd'
import dialogue from '@/components/common/dialogue'
var vmData = {
	sample:[],
	currPage:1,
	isPageEnd:false,
	msg:"没有更多了",
	isShowDia:false
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
	components:{isEnd,dialogue},
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