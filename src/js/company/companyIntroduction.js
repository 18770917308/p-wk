import $ from 'jquery'
var vmData = {
	type:1,
	isMore:false,
	comData:'',
	isShowContent:false
};
export default{
	name: 'companyIntroduction',
	data(){
		return vmData;
	},
	created:function(){
		var self = this;
		self.type = 1;
		self.getData();
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
		getData(){
			var self = this,
				url='index.php/Buyer/Checkcompany/info/',
				data = {
					type:self.type,
					comid:self.$route.params.id
				},
				response = self.ajaxCommon(url,data).responseJSON;
				if(response.status == 1){
					self.comData = response.result;
				}else{
					console.log("请求出错");
				}
		},
		changeType(type){
			var self =this;
			self.type = type;
			self.getData();
		},
		downContent(){
			this.isShowContent = !this.isShowContent;
		},
		goBack(){
			this.$router.back()
		}

	}
}