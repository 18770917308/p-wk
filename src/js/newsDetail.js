import $ from 'jquery'
var vmData = {
	newsDetail:''
};
export default{
	name:'newsDetail',
	data(){
		return vmData;
	},
	created:function(){
		this.getNewsDetail();
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
		getNewsDetail(){
			var self = this,
				url = 'index.php/supplier/News/detail',
				data = {
					id:self.$route.params.id
				},
				response = self.ajaxCommon(url,data);
				console.log("资讯详情：",response);
				self.newsDetail = response.responseText;
		},
		goBack(){
			this.$router.back()
		}
	}
}