import $ from 'jquery'
var vmData = {
	buyDetail:'',
	thumb:[
		'src/assets/image/img1.jpg',
		'src/assets/image/img2.jpg',
		'src/assets/image/img3.jpg'
	]
};
export default{
	name: 'buyDetail',
	data(){
		return vmData;
	},
	created:function(){
		this.getBuyDetail();
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
		getBuyDetail(){
			var self = this,
				url = 'Buyer/v2/Buy/buyDetail/',
				data = {
					buyid:self.$route.params.id
				},
				response = self.ajaxCommon(url,data).responseJSON;
				console.log('response',response);
				if(response.status==1){
					self.buyDetail = response.result;
				}else{
					console.log("请求出错");
				}
		}
	}
}