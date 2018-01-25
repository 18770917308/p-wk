import $ from 'jquery'
import dialogue from '@/components/common/dialogue'
var vmData = {
	type:1,//1全部产品 2新品上架
	products:null,
	isShowDia:false
};
export default{
	name:'companyHome',
	data(){
		return vmData;
	},
	components:{
		dialogue
	},
	created:function(){
		this.type = 1;
		this.getCompanyProduct();
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
		getCompanyProduct(){//获取公司的产品列表
			var self =this,
				url = 'Buyer/v2/Checkcompany/index/',
				data = {
					comid:self.$route.params.id,
					type:self.type
				},
				response = self.ajaxCommon(url,data).responseJSON;
				if(response.status == 1){
					self.products = response.result;
					if(self.type==2){
						for(var i =0;i<self.products.product_list.length; i++){
							self.products.product_list[i].inputtime = self.formatDate(self.products.product_list[i].inputtime+'000');
						}
					}
				}else{
					console.log("请求出错");
				}
		},
		formatDate(str){//日期格式化
			var date = new Date(),
				time;
			date.setTime(str);
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			time = year+'-'+month+'-'+day;
			return time;
		},
		selectType(type){
			this.type = type;
			this.getCompanyProduct();
		},
		goBack(){
			this.$router.back()
		},
		goSearch(){//跳转至搜索
			this.$router.push({path:'/search'});
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