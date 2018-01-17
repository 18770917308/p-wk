<template>
	<div class="hot">
		<div class="top"><router-link to="/"><i class="le-icon icon-back"></i></router-link></a>热门供应</div>
		<!--产品列表-->
		<ul >
			<li v-for="item in list" class="list-item clearfix">
				<a href="#/category">
					<div class="img-con fl">
						<img v-lazy="item.img" alt="product image">
					</div>
					<div class="info fl">
						<h4 class="name">{{item.title}}</h4>
						<div class="price red">{{item.price}}</div>
						<div class="heat red"><i class="le-icon icon-hot"></i>{{item.deg}}</div>
					</div>
				</a>
				
			</li>
		</ul>
		<div v-if="isDown" class="no-more loading">
			没有更多
		</div>
		<!--正在加载-->
		<div v-else class="loading" ref="loading">
			<img src="~components/util/loading.gif" alt="加载中...">
		</div>

	</div>
</template>
<script type="esmascript-6">
	import axio from 'axios';
	import {WScroll} from 'components/util/WScroll';
	import Vue from 'vue'
	export default{
		data(){
			return {
				list:[],
				pages:9999,
				index:0,
				wscroll:new Object(),
			}
		},
		methods:{
			_loadProduct(page){
				let _this = this;
				axio.get(_this.baseUrl+"Buyer/v2/index/hotProduct/?page="+page)
					.then(function(response){
						//console.log("response",response);
						if(1 == response.data.status){
							//请求成功
							 _this.pages = response.data.pages;
							 _this.index = page;
							 _this.list.push(...response.data.result);
							//console.log("_this.list",_this.list);
							Vue.nextTick(function(){
								//重新计算
								WScroll.allRecount();
							})
						}
					}).catch(function(err){
						console.log("load err",err);
					})
			},
			loadMore(){
				if(this.index < this.pages){
					this._loadProduct(++this.index);
					return true;
				}else{
					return false;
				}
			}

		},
		computed:{
			isDown(){
				//console.log("isDown",this.index >= this.pages);
				return this.index >= this.pages;
			}
		},
		created(){
			this.loadMore();
		},
		mounted(){
			var _this = this;
			this.wscroll = new WScroll(this.$refs.loading,{
				up:{
					topShowInB:function(scrollTop){
						console.log("load");
						_this.loadMore();
					}
				}
			})
		}
	}
</script>

<style scoped rel="stylesheet/less" type="text/less" lang ="less">
	@import "~@/common/mixin.less";
	@import "~@/common/variable.less";
	.hot{
		font-size:14px;
	}
	/*icon*/
	.icon-back{
		width:17px;
		height:20px;
		 background-image: url('~assets/icon/back.png');
		 background-size:12px 20px;

	}
	.icon-hot{
		width:20px;
		height:20px;
		 background-image: url('~assets/icon/hot.png');
		  background-size: 20px;
	}
	.hot{
		width:100%;
		max-width:640px;
		min-width:320px;
		margin:0 auto;
		padding-top:42px;
		.top{
			line-height:41px;
			font-size:18px;
			height:41px;
			background-color:@primaryColor;
			position:fixed;
			border-bottom:2px solid @borderColor;
			left:0;
			top:0;
			right:0;
			max-width:640px;
			min-width:320px;
			margin:0 auto;
			z-index:9999;
			text-align: center;

			.le-icon{
				position:absolute;
				left:14px;
				top:10px;
			}
		}
	}


	.list-item{
		border-bottom:1px solid @borderColor;
		.padding-rem(top,20);
		.padding-rem(bottom,20);
		background-color:#fff;
		overflow:hidden;

		.img-con{
			.width-rem(200);
			.height-rem(200);
			position:relative;
			.margin-rem(left,24);
			.margin-rem(right,24);
			overflow:hidden;
			img{
				width:100%;
				position:absolute;
				top:50%;
				left:0;
				transform:translate(0,-50%);
			}
		}
		
		.info{
			.width-rem(460);
			text-align:left;
			line-height:18px;
			.name{
				font-size:15px;
				font-weight:normal;
				.margin-rem(top,10);
				.margin-rem(bottom,22);
				/*font-weight:bold;*/
				max-height:48px;
				overflow:hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;

				
			}
			.price{
				.margin-rem(bottom,22);
				font-weight:bold;
			}
			.heat .le-icon{
				.margin-rem(right,10);
				font-weight:bold;
			}
		}
	}

	.loading{
		background-color:#fff;
		.padding-rem(top,20);
		.padding-rem(bottom,20);
		img{
			margin:0 auto;
		}
	}

</style>