import $ from 'jquery'
var vmData = {
	category:'',
	catid:''
};
export default{
	name: 'category',
	data(){
		return vmData;
	},
	created:function(){
		this.getCategory();
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
		getCategory(){
			var self = this,
				url = 'index.php/supplier/category/index',
				response = self.ajaxCommon(url);
				//console.log('分类：',response);
				if(response.responseJSON.status == 1){
					self.category = response.responseJSON.result;
					self.catid = self.category[0].catid;
				}else{
					//console.log("请求出错，请检查");
				}
		},
		categoryChange(id){
			window.scrollTo(0,0);
			var self= this;
			self.catid = id;
		},
		goSearch(){//跳转至搜索
			this.$router.push({path:'/search'});
		},
		goBack(){
			this.$router.back()
		}
	}
}