<template>
	<div class="product-list">
		<header class="search-header header">
				<div class="search-wrap" @click="goSearch">
					<i class="search-icon"></i>
					<input type="text" class="search-input">
					<div class="search-keyword" v-if="keyword">
						<span class="keyword">{{keyword}}</span>
						<span class="delete-keyword">×</span>
					</div>
				</div>
				<a class="to-back" @click="goBack"></a>
				<a class="view-type" :class='{active:viewType}' @click="viewTypeToggle" href="javascipt:void(0)"></a>
		</header>
		<ul class="fliter-product clearfix">
			<li :class='{active:searchType==1}' @click="choseSearchType(1)">综合</li>
			<li :class='{active:searchType==2}' @click="choseSearchType(2)">新品</li>
			<li @click="showFilter">筛选</li>
		</ul>
		<ul class="products-1" v-if="!viewType">
			<li class="products1-item" v-for="item in products">
				<router-link :to="{name:'productDetail',params: {id:item.productid}}" class="products1-link clearfix">
					<i class="products1-img"><img v-lazy="item.thumb" alt=""></i>
					<div class="products1-con">
						<p class="products1-con-title" v-text="item.title"></p>
						<a class="products1-con-sign prod-exam" v-if="item.sampling_method==''">没有样品</a>
						<a class="products1-con-sign prod-exam" v-if="item.sampling_method==1">免费取样</a>
						<a class="products1-con-sign prod-exam" v-if="item.sampling_method==2">收费取样</a>
						<p class="products1-con-main products1-con-price">{{item.price}}/{{item.units}}</p>
					</div>
				</router-link>
			</li>
		</ul>
		<div class="products-2 clearfix" v-if="viewType">
			<router-link :to="{name:'productDetail',params: {id:productid}}" class="products2-link" v-for="item in products">
				<i class="products2-img"><img v-lazy="item.thumb" alt=""></i>
				<p class="products2-title ellipsis" v-text="item.title"></p>
				<div class="products2-bottom clearfix">
					<span class="products2-price">{{item.price}}/{{item.units}}</span>
					<a class="products2-con-sign prod-exam" v-if="item.sampling_method==''">没有样品</a>
					<a class="products2-con-sign prod-exam" v-if="item.sampling_method==1">免费取样</a>
					<a class="products2-con-sign prod-exam" v-if="item.sampling_method==2">收费取样</a>
				</div>
			</router-link>
		</div>
		<is-end v-if="isPageEnd" msg="没有更多了"></is-end>
		<div class="fliter-mask" v-if="isShowFilter" @click="hideFilterMask">
			<div class="filter-conditions" @click.stop="">
				<div v-for="(item,index1) in category">
					<p class="filter-title" v-text="item.title"></p>
					<ul class="filter-list clearfix">
						<li v-for="cItem in item.list" v-text="cItem.title" :class='{active:index1==0 && server==cItem.typeid || index1==1 && time==cItem.typeid || index1==2 && catid==cItem.typeid}'  @click="choseFilters(index1,cItem.typeid)"></li>
						<!-- <li :class='{active:server==2}' @click="serverFilter(2)">实地验厂</li> -->
					</ul>
				</div>
				
				<!-- <p class="filter-title">上架时间</p>
				<ul class="filter-list clearfix">
					<li :class='{active:time == 1}' @click="timeFilter(1)">最近7天</li>
					<li :class='{active:time == 2}' @click="timeFilter(2)">最近30天</li>
					<li :class='{active:time == 3}' @click="timeFilter(3)">最近90天</li>
				</ul>
				<p class="filter-title">产品分类</p>
				<ul class="filter-list clearfix">
					<li v-for="item in category" v-text="item.catname" 
					:class="{active:catid==item.catid}" @click="categoryFilter(item.catid)"></li>
				</ul> -->
				<div class="filter-btns clearfix">
					<button type="button" class="filter-reset" @click="resetFilter">重置</button>
					<button type="button" class="filter-ok" @click="getFilterResult">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="../js/productList.js"></script>
<style scoped src="../css/productList.css"></style>