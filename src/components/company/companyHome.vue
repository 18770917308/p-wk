<template>
	<div class="companyHome" @click="hideShare">
		<header class="search-header header">
				<div class="search-wrap" @click="goSearch">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商" readonly="readonly">
				</div>
				<a class="to-back" href="javascript:void(0)" @click="goBack"></a>
				<i class="share-icon" @click.stop="goShare"></i>
		</header>
		<div class="company-top">
			<div class="company-top-con clearfix">
				<div class="company-inf">
					<i class="company-logo"><img v-lazy="comInf.logo" alt=""></i>
					<div class="company-sign">
						<p class="company-name ellipsis" v-text="comInf.companyname"></p>
						<span class="company-type company-type2" v-if="comInf.pattern==2">制造商</span>
						<span class="company-type company-type3" v-if="comInf.pattern==1">服务商</span>
						<span class="company-level company-level3" v-if="comInf.mfrs_level==3"></span>
						<span class="company-level company-level2" v-if="comInf.mfrs_level==2"></span>
						<span class="company-level company-level1" v-if="comInf.mfrs_level==1"></span>
					</div>
				</div>
				<ul class="attention">
					<li class="attention-num">{{products.follow_com_num}}人</li>
					<li class="attention-btn">关注</li>
				</ul>
			</div>
		</div>
		<ul class="company-nav">
			<li :class='{active:type==3}' @click="selectType(3)">企业展厅</li>
			<li :class='{active:type==1}' @click="selectType(1)">全部产品</li>
			<li :class='{active:type==2}' @click="selectType(2)">新品上架</li>
		</ul>
		<ul class="company-products" :class="{activeHide:type!=1}">
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
		<ul class="company-products" :class="{activeHide:type!=2}">
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
		<div class="company-hall" :class="{activeHide:type!=3}">
			<p class="hall-title">企业全景</p>
			<div class="hall-content">
				<img class="panoramic-img" :src="comInf.view_thumb" alt="" v-if="comInf.view_thumb">
				<i class="icon-panoramic" v-if="comInf.view_thumb"><img src="../../assets/image/icon-panoramic.png" alt=""></i>
				<img class="panoramic-img" v-if="!comInf.view_thumb" src="../../assets/image/no-panoramic-b.png" alt="">
			</div>
			<p class="hall-title">企业专访</p>
			<div class="hall-content">
				<video src="" width=100% style="background:#d1d1d1;"></video>
				<i class="video-btn icon-play"><img src="../../assets/image/b-play.png" alt=""></i>
				<i class="video-btn icon-play" v-if="false"><img src="../../assets/image/b-stop.png" alt=""></i>
			</div>
			<p class="hall-title">精品推荐</p>
			<div class="swiper-box">
				<swiper :options="c_swiperOption" ref="mySwiper1" :class>
		          <swiper-slide v-for="item in comInf.product_list">
		            <router-link :to='{name:"productDetail",params:{id:item.id}}' class="recommend-item">
		            	<i class="recommend-img"><img :src="item.thumb" alt=""></i>
		            	<p class="recommend-title ellipsis" v-text="item.title"></p>
		            </router-link>
		          </swiper-slide>
				</swiper>
				<ul class="no-recommend-ul" v-if="false"><!--无推荐产品时-->
					<li class="no-recommend-1"></li>
					<li class="no-recommend-2"><p class="re-tips"><img src="../../assets/image/no-recommend.png" alt="">&nbsp;暂无产品</p></li>
					<li class="no-recommend-3"></li>
				</ul>
		        <div class="img-shadow"><i class="circle"></i><i class="g-shadow"></i></div>
			</div>
		</div>
		<footer class="companyHome-foot">
			<router-link :to='{name:"companyIntroduction",params:{id:$route.params.id}}' class="go-introduce">企业介绍</router-link>
			<a href="javascript:void(0)" @click="showDia" class="link-introduce">联系商谈</a>
		</footer>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
		<!--分享-->
		<share @click.stop=""></share>
	</div>
</template>
<script src="../../js/company/companyHome.js"></script>
<style scoped src="../../css/company/companyHome.css"></style>