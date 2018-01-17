<template>
	<div class="excellent-com">
		<div class="top">
			<router-link to="/"><i class="le-icon icon-back"></i></router-link>
		    <strong>优质企业</strong>
		</div>
		<!--tab-->
		<div class="tab">
			<span data-index="0" ref="tabitem0" @click="_tabClick" >OEM厂</span>
			<span data-index="1" ref="tabitem1" @click="_tabClick" >包材厂</span>
			<span data-index="2" ref="tabitem2" @click="_tabClick" >仪器厂</span>
			<span data-index="3" ref="tabitem3" @click="_tabClick" >服务商</span>
			<div class="divider" ref="divider"></div>
		</div>
		<!--公司列表-->
		<ul >
			<li class="item" v-for="item in list">
				<a href="#">
					<div class="title">
						<img v-lazy="item.logo" alt="">
						<h3>{{item.companyname}}</h3>
						<i class="le-icon icon-more"></i>
					</div>
				</a>
				<div class="img-con">
					<span v-if='!item.product.length'>暂无推荐产品</span>
					<img v-lazy="pro.thumb" alt="" v-for="pro in item.product" v-else>
				</div>
				
			</li>

		</ul>
		<div class="loading" v-if="finish">
			没有更多
		</div>
		<div class="loading" v-else ref="loading">
			<img src="~components/util/loading.gif" alt="">
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import {WScroll} from 'components/util/WScroll'
	const CATID = [690,549,650,599]
	const ORIGINTABINDEX = -1
	export default {
		data(){
			return {
				list:[],
				tabIndex:-1,
				store:[
					{
						list:[],
						currentIndex:0,
						pages:9999
					},
					{
						list:[],
						currentIndex:0,
						pages:9999
					},
					{
						list:[],
						currentIndex:0,
						pages:9999
					},
					{
						list:[],
						currentIndex:0,
						pages:9999
					}
				]
			}
		},
		created(){
		},
		mounted(){
			this._initDivider()
			this.routeId = this.$route.params.id
			this.routeIndex = this._findIndex(this.routeId,CATID)
			//console.log('id',this.routeIndex)
			this.tabIndex = this.routeIndex //开始加载和切换视图
			window.addEventListener('resize',(e)=>{
				this._initDivider()
				this._moveDivider(this.tabIndex)
			})

			//拉到底部的监听事件
			let _this = this;
			this.wscroll = new WScroll(this.$refs.loading,{
				up:{
					topShowInB:function(scrollTop){
						//加载更多
						//console.log('down');
						_this._getMoreData(_this.tabIndex);
					}
				}
			})
		},
		methods:{
			_findIndex(item,array){
				if(!array.length) return 0
				let index = 0
				array.forEach(function(i,indexs){
					if(i == item){
						index = indexs
					}

				})
				return index
			},
			_initDivider(){
				let width = this.$refs.tabitem1.offsetWidth
				this.$refs.divider.style.width = width + 'px'
			},
			_moveDivider(index){
				let offsetLeft = this.$refs['tabitem' + index].offsetLeft
				this.$refs.divider.style.left = offsetLeft + 'px'
			},
			_tabClick(e){
				let tab = e.currentTarget.dataset['index'] || 0
				//console.log('tab',tab)
				this.tabIndex = tab
				
			},
			_getDataFromServer(index,page){
				let _this = this
				const url = this.baseUrl + 'Buyer/v3/index/factoryList/?catid=' + CATID[index] + '&page='+ page
				let promise = axios.get(url)
				promise.tabIndex = this.tabIndex
				this.store[this.tabIndex].promiase = promise
				promise.then(function(res){
					//console.log('res',this)
					if(1 === res.data.status){
						_this.store[this.tabIndex].pages = res.data.pages
						_this.store[this.tabIndex].currentIndex ++;
						_this.store[this.tabIndex].list.push(...res.data.result) 

						if(_this.tabIndex === this.tabIndex){
							_this.list = _this.store[this.tabIndex].list
							let timer = setTimeout(()=>{
								WScroll.allRecount()
							})
						}
					}
				}.bind(promise))
				.catch((err)=>{
					console.log("err",err)
				})
			},
			_getMoreData(index){
				if(this.store[this.tabIndex].currentIndex < this.store[this.tabIndex].pages){
					console.log('load more');
					let page = this.store[this.tabIndex].currentIndex + 1
					this._getDataFromServer(this.tabIndex,page)
				}
			}
		},
		computed:{
			finish(){
				if(this.tabIndex == ORIGINTABINDEX)  return false
				return this.store[this.tabIndex].currentIndex >= this.store[this.tabIndex].pages
			}
		},
		watch:{
			tabIndex:function(newData,oldData){

				this._moveDivider(newData)
				//切换视图
				this.list = this.store[newData].list
				//console.log('list',this.list)
				this._getMoreData(newData)
			}
		}
	}
	
</script>
<style rel="stylesheet/less" lang='less' scoped type="text/less">
	@import "~@/common/mixin.less";
	@import "~@/common/variable.less";
	.excellent-com{
		width:100%;
		max-width:@maxWidth;
		min-width:@minWidth;
		margin:0 auto;
		padding-top:43px;
		background-color:#f3f3f3;
		font-size:15px;
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
		strong{
			font-weight:normal;
		}
	}

	.tab{
		line-height:40px;
		color:#999;
		background-color:#fff;
		display:flex;
		justify-content:center;
		position:relative;
		height:40px;
		overflow:hidden;
		span{
			flex:1;
			margin:0 10px;
			&.active{
				color:#333;
			}
		}
		.divider{
			position:absolute;
			height:3px;
			background-color:#333;
			bottom:0;
			transform:translateZ(0);
			transition:left 0.2s ease-in-out;
		}
	}

	.item{
		margin-top:24px;
		background-color:#fff;
		padding:18px 10px 8px;
		.title{
			display:flex;
			justify-content:center;
			align-items:center;
			img{
				width:23px;
				height:23px;
				margin-right:6px;
			}
			h3{
				flex:1;
				text-align:left;
				font-weight:normal;
				font-size:15px;
			}
		}
		.img-con{
			display:flex;
			align-items:center;
			justify-content:space-around;
			margin-top:15px;
			height:110px;

			img{
				width:110px;
				height:110px;

			}
			@media all and (max-width:360px){
				&{
					height:90px;
				}
				img{
					width:90px;
					height:90px;
				}
			} 
		}

	}

	.loading{
		padding:20px;
		font-size:14px;
		background-color:#f3f3f3;
		img{
			margin:0 auto;
		}
	}
</style>