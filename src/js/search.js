import $ from 'jquery'
import dialogue from '@/components/common/dialogue'
var vmData = {
	hotKeyProduct:[],
	hotKeyCom:[],
	isProduct:true,//当前是否为热搜产品
	historyProduct:[],
	historyCom:[],
	keyword:null,
	isHide:true,
	modalTitle:"确定要清空历史搜索吗？"
};
export default{
	name:'search',
	data(){
		return vmData;
	},
	created:function(){
		this.getKeywords();
		this.getHistory();
	},
	components:{dialogue},
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
						//console.log("获取数据失败");
					}
				})
		},
		getKeywords(){//获取热门搜索
			var url = 'Buyer/Product/hotkeywords/',
				self = this,
				response = self.ajaxCommon(url).responseJSON;
				//console.log('热门搜索：',response);
			if(response.status === 1){
				self.hotKeyProduct = response.result.hot_keywords;
				self.hotKeyCom = response.result.com_hot_keywords;
			}else{
				console.log("获取数据失败");
			};	
		},
		searchToggle(type){//搜索类型切换
			var self = this;
			if(type==1){
				self.isProduct = true;
			}else if(type==2){
				self.isProduct = false;
			}
		},
		goSearch(){//搜索相关产品或企业
			var self = this;
			if(self.isProduct){
				if(self.historyProduct && self.historyProduct.length==5){//历史记录超过5条
					self.historyProduct.pop();
				}else if(self.historyProduct === null ){//已清空
					self.historyProduct = [];
				}
				if(self.keyword && self.keyword !=" ")
				self.historyProduct.unshift(self.keyword);
				localStorage.setItem('historyProduct',self.historyProduct);
			}else{
				if(self.historyCom && self.historyCom.length==5){//历史记录超过5条
					self.historyCom.pop();
				}else if(self.historyCom === null ){//已清空
					self.historyCom = [];
				}
				self.historyCom.unshift(self.keyword);
				localStorage.setItem('historyCom',self.historyCom);
			};
			this.$router.push({path:'/productList/'+self.keyword});
		},
		getHistory(){//获取历史搜索 （本地存储）
			var self = this;
			if(localStorage.getItem('historyProduct')){
				self.historyProduct = localStorage.getItem('historyProduct').split(",");
			}
			localStorage.setItem('historyProduct',self.historyProduct);
			if(localStorage.getItem('historyCom')){
				self.historyCom = localStorage.getItem('historyCom').split(",");
			}
			localStorage.setItem('historyCom',self.historyCom);
		},
		hideDialogue(){//点击取消
			this.isHide = true;
		},
		deleteHistory(){//点击确定
			var self =this;
			if(self.isProduct){
				localStorage.removeItem('historyProduct');
				self.historyProduct=null;
			}else{
				localStorage.removeItem('historyCom');
				self.historyCom=null;
			};
			this.isHide =true;
		},
		beforeDelete(){//点击删除图标
			this.isHide = false;
		}
	},
}