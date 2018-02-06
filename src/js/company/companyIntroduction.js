import $ from 'jquery'
import dialogue from '@/components/common/dialogue'
import share from '@/components/common/share'
var vmData = {
	type:1,
	isMore:false,
	comData:'',
	isShowContent:false,
	isShowDia:false,
	isMap:false,
	isShare:false,
	companyname:'',
	comlogo:''

};
export default{
	name: 'companyIntroduction',
	data(){
		return vmData;
	},
	created:function(){
		var self = this;
		self.type = 1;
		self.isMap = false;
		self.isShare = false;
		self.getData();
	},
	mounted(){
		this.init();
		let _this = this;
        this.$nextTick(function () {
            window._bd_share_config = {
                "common":{
                "bdSnsKey":{},
				"bdText":this.companyname,
				"bdDesc":this.companyname,
				"bdMini":"2",
				"bdPic":this.comlogo,
				"bdStyle":"0",
				"bdUrl":"https://cn.vuejs.org/v2/guide/class-and-style.html",//分享的链接
				"bdSize":"32"},
				"share":{}
            };
            
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
        })
	},
	components:{
		dialogue,
		share
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
					if(self.comData.set_up_time){
						self.comData.set_up_time = self.formatDate(self.comData.set_up_time+"000")
					}
					if(self.comData.lng && self.comData.lat){
						self.isMap = true;
					}
					if(self.comData.companyname){
						self.companyname = self.comData.companyname
					}
					if(self.comData.logo){
						self.comlogo = self.comData.logo;
					}
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
		},
		init(){
			var self =this;
			var map = new AMap.Map('comMap', {
					    resizeEnable: true,
					    zoom:11,
					    center: [self.comData.lng, self.comData.lat]        
					});
			var	marker = new AMap.Marker({
				position: [self.comData.lng, self.comData.lat],
				title: self.comData.companyname,
				map:map
			});
			var infoWindow = new AMap.InfoWindow();
			infoWindow.setContent(self.comData.companyname);
			infoWindow.open(map, [self.comData.lng, self.comData.lat]);
		},
		showDia(){//显示对话框
			this.isShowDia =true;
		},
		hideDialogue(){//隐藏对话框
			this.isShowDia =false;
		},
		downAPP(){//点击确定 下载APP 需判断设备类型 Android or iOS
			this.isShowDia =false;
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
		goShare(){
			$(".bdsharebuttonbox").css({
				"zIndex":"223",
				"visibility":"visible"
			});
		},
		hideShare(){
			$(".bdsharebuttonbox").css({
				"zIndex":"-1",
				"visibility":"hidden"
			});
		}
	}
}