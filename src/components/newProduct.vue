<template>
	<div class="new">
		<div class="top">
			<router-link to="/"><i class="le-icon icon-back"></i></router-link>
		    <strong>新品上架</strong>
		</div>
		<div v-for='item in newProList'>
			<div class="time">
				{{item.time}}
			</div>
			<ul class="list">
				<li class="item" v-for='pro in item.list'>
					<router-link :to="{name:'productDetail',params: {id:pro.productid}}">
						<div class="img-con">
							<img v-lazy="pro.thumb" alt="">
						</div>
						<div class="text-con">
							<h4>{{pro.title}}</h4>
							<span class="price  red">{{pro.price}}/{{pro.units}}</span>
							<span class="le-icon sample-type" v-if="pro.sampling_method==1">免费取样</span>
							<span class="le-icon sample-type" v-if="pro.sampling_method==2">收费取样</span>
							<span class="le-icon sample-type" v-if="pro.sampling_method==''">没有样品</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="loading" v-if="finish">
			没有更多
		</div>
		<div class="loading" v-else ref="loading">
			<img src="~components/util/loading.gif" alt="">
		</div>
		
	</div>
</template>

<script>
	import {WScroll} from 'components/util/WScroll.js'
	import axios from 'axios'
	import vueLazyLoad from 'vue-lazyload'
	import Vue from 'vue'
	import loading from 'assets/icon/img-loading.gif'
	Vue.use(vueLazyLoad,{
		preLoad:1.3,
		loading:loading,
		attempt:1,
	})
	export default {
		data(){
			return {
				newProList:[],
				currentIndex:0,
				pages:9999,

				
			}
		},
		created(){
			this._getNewProduct(1);

		},
		methods:{
			_getNewProduct(page){
				let _this = this;
				axios.get(this.baseUrl + '/Buyer/v2/index/newProduct/?page=' + page)
					.then(function(res){
						if(1 === res.data.status){
							console.log("res",res);
							_this.pages = res.data.pages;
							_this.newProList.push(...res.data.result);
							_this.currentIndex ++ ;
							let timer = setTimeout(function(){
								WScroll.allRecount();
								clearTimeout(timer);
							},20)
						}
					})
					.catch(function(err){
						console.log(err)
					})
			},
			

		},
		mounted(){
			var _this = this;
			this.wscroll = new WScroll(this.$refs.loading,{
				up:{
					topShowInB:function(scrollTop){
						//加载更多
						if(_this.currentIndex < _this.pages){
							let page = _this.currentIndex +1;
							console.log("page",page);
							_this._getNewProduct(page);
						}
					}
				}
			})
		},
		computed:{
			finish(){
				return this.currentIndex >= this.pages ;
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less" type="text/less" scoped>
	@import "~@/common/mixin.less";
	@import "~@/common/variable.less";
	.icon-free-sample{
		width:61px;
		height:21px;
		background-image:url('~assets/icon/free-sample.png');
		background-size:61px 21px;
	}
	.new{
		width:100%;
		max-width:@maxWidth;
		min-width:@minWidth;
		margin:0 auto;
		padding-top:43px;
	}
	.sample-type{
		width:72px;
		height:20px;
		line-height:20px;
		padding:0 0 0 18px;
		border:1px solid #fccf00;
		color:#fccf00;
		border-radius:4px;
		font-size:11px;
		background:url('~assets/image/icon-example.png') 2px center no-repeat;
		background-size:10px;
	}

	.top{
		position:fixed;
		left:0;
		top:0;
		right:0;
		max-width:@maxWidth;
		min-width:@minWidth;
		margin:0 auto;
		height:42px;
		line-height:42px;
		background-color:@themeColor;
		font-size:18px;
		text-align:center;
		border-bottom:1px solid #e0e0e0;
		z-index:9999;
		.le-icon{
			position:absolute;
			left:16px;
			top:10px;
		}
		strong{font-weight:normal;}
	}

	.loading{
		padding:20px;
		font-size:12px;
		background-color:#f3f3f3;
		img{
			margin:0 auto;
		}
	}

	.time{
		font-size:14px;
		height:26px;
		line-height:26px;
		padding-left:10px;
		text-align:left;
		color:#999;
		background-color:#f3f3f3;
	}

	.img-con{
		width:110px;
		height:110px;
		overflow:hidden;
		position:relative;
		margin-right:10px;
		img{
			position:absolute;
			width:100%;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
		}
	}

	.list{
		display:flex;
		flex-direction:column;
		background:#fff;
		.item{
			border-bottom:1px solid #e0e0e0;
			&:nth-last-of-type(1){
				border-bottom:none;
			};
			a{
				display:flex;
				padding:10px;
				.text-con{
					flex:1;
					font-size:14px;
					line-height:1.285714;
					display:flex;
					flex-direction:column;
					padding:8px 0;
					justify-content:space-between;
					text-align:left;
					h4{
						font-weight:normal;
						max-height:35px;
						overflow:hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					strong{
						font-weight:normal;
					}
				}
			}

			

		}
		

	}

</style>