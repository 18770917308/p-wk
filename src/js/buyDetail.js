import $ from 'jquery'
import dialogue from '@/components/common/dialogue'
var vmData = {
	buyDetail:'',
	isShowDia:false
};
export default{
	name: 'buyDetail',
	data(){
		return vmData;
	},
	created:function(){
		this.getBuyDetail();
	},
	components:{dialogue},
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
				//console.log('response',response);
				if(response.status==1){
					self.buyDetail = response.result;
				}else{
					console.log("请求出错");
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