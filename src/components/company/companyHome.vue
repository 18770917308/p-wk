<template>
	<div class="companyHome">
		<header class="search-header header">
				<div class="search-wrap" @click="goSearch">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商">
				</div>
				<a class="to-back" @click="goBack"></a>
				<i class="share-icon"></i>
		</header>
		<div class="company-top" :style="{background:products.background}">
			<div class="company-top-con clearfix">
				<div class="company-inf">
					<i class="company-logo"><img v-lazy="products.logo" alt=""></i>
					<div class="company-sign">
						<p class="company-name ellipsis" v-text="products.companyname"></p>
						<span class="company-type company-type2" v-if="products.pattern==2">制造商</span>
						<span class="company-type company-type3" v-if="products.pattern==1">服务商</span>
						<span class="company-level company-level3" v-if="products.mfrs_level==3"></span>
						<span class="company-level company-level2" v-if="products.mfrs_level==2"></span>
						<span class="company-level company-level1" v-if="products.mfrs_level==1"></span>
					</div>
				</div>
				<ul class="attention">
					<li class="attention-num">{{products.follow_com_num}}人</li>
					<li class="attention-btn">关注</li>
				</ul>
			</div>
		</div>
		<ul class="company-nav">
			<li>企业展厅</li>
			<li :class='{active:type==1}' @click="selectType(1)">全部产品</li>
			<li :class='{active:type==2}' @click="selectType(2)">新品上架</li>
		</ul>
		<ul class="company-products" v-if="type==1">
			<li class="company-products-item" v-for="item in products.product_list">
				<router-link :to="{name:'productDetail',params:{id:item.productid}}" class="company-products-link clearfix">
					<i class="company-products-img"><img v-lazy="item.thumb" alt=""></i>
					<div class="company-products-con">
						<p class="company-products-title" v-text="item.title"></p>
						<a class="company-products-sign prod-exam" v-if="item.sampling_method==1">免费取样</a>
						<a class="company-products-sign prod-exam" v-if="item.sampling_method==2">收费取样</a>
						<a class="company-products-sign prod-exam" v-if="item.sampling_method==''">没有样品</a>
						<p class="company-products-main company-products-price">{{item.price}}/{{item.units}}</p>
					</div>
				</router-link>
			</li>
		</ul>
		<ul class="company-products" v-if="type==2">
			<li class="company-products-item" v-for="item in products.product_list">
				<p v-text="item.inputtime" class="new_product_time"></p>
				<router-link v-for="items in item.list_data" :to="{name:'productDetail',params:{id:items.productid}}" class="company-products-link clearfix">
					<i class="company-products-img"><img v-lazy="items.thumb" alt=""></i>
					<div class="company-products-con">
						<p class="company-products-title" v-text="items.title"></p>
						<a class="company-products-sign prod-exam" v-if="items.sampling_method==1">免费取样</a>
						<a class="company-products-sign prod-exam" v-if="items.sampling_method==2">收费取样</a>
						<p class="company-products-main company-products-price">{{items.price}}<span v-if="items.price!='面议'">/{{items.units}}</span></p>
					</div>
				</router-link>
			</li>
		</ul>
		<div class="company-hall" v-if="false">
			<p class="hall-title">企业全景</p>
			<div class="hall-content">
				<img class="panoramic-img" src="../../assets/image/panoramic.png" alt="">
				<i class="icon-panoramic"><img src="../../assets/image/icon-panoramic.png" alt=""></i>
			</div>
			<p class="hall-title">企业专访</p>
			<div class="hall-content">
				<video src="" width=100% style="background:#d1d1d1;"></video>
				<i class="video-btn icon-play"><img src="../../assets/image/b-play.png" alt=""></i>
				<i class="video-btn icon-play" v-if="false"><img src="../../assets/image/b-stop.png" alt=""></i>
			</div>
			<p class="hall-title">精品推荐</p>
		</div>
		<footer class="companyHome-foot">
			<router-link :to='{name:"companyIntroduction",params:{id:$route.params.id}}' class="go-introduce">企业介绍</router-link>
			<a href="javascript:void(0)" @click="showDia" class="link-introduce">联系商谈</a>
		</footer>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
	</div>
</template>
<script src="../../js/company/companyHome.js"></script>
<style scoped src="../../css/company/companyHome.css"></style>