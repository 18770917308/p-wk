import $ from 'jquery'
import share from '@/components/common/share'
var vmData = {
	newsDetail:'',
	isShare:false,
};
export default{
	name:'newsDetail',
	data(){
		return vmData;
	},
	created:function(){
		this.getNewsDetail();
	},
	components:{
		share
	},
	mounted(){
		let _this = this;
		let content = $(".container h3").text();
        this.$nextTick(function () {
            window._bd_share_config = {
                "common":{
                "bdSnsKey":{},
				"bdText":content,
				"bdDesc":content,
				"bdMini":"2",
				"bdPic":'',
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