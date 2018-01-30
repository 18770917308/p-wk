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
	mounted(){
		var map = new AMap.Map('comMap', {
				    resizeEnable: true,
				    zoom:11,
				    center: [this.comData.lng, this.comData.lat]        
				});
		var	marker = new AMap.Marker({
			position: [this.comData.lng, this.comData.lat],
			title: this.comData.companyname
			    });
			marker.setMap(map);
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
				url='Buyer/v2/checkcompany/info/',
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