<template>
	<div class="productDetail" @click="hideShare">
		<header class="normal-header">
				<div class="search-wrap">
					<span class=" product-module" :class='{active:!isH5}' @click="changeView(1)">产品</span>
					<span class="detail-module" :class='{active:isH5}' @click="changeView(2)">详情</span>
				</div>
				<a class="to-back" @click="goBack"></a>
				<i class="share-icon" @click.stop="goShare"></i>
		</header>
		<div v-if="!isH5">
			<div class="product-slides">
				<!-- <div class="product-video" v-if="productDetail.video!=''">
					<video :src="productDetail.video" id="p-video"></video>
					<i class="play-video" v-if="!isPlaying" @click="videoPlayAndStop"><img src="../assets/image/b-play.png" alt=""></i>
					<i class="stop-video" v-if="isPlaying" @click="videoPlayAndStop"><img src="../assets/image/b-stop.png" alt=""></i>
				</div> -->
				<swiper :options="swiperOption" ref="mySwiper2" :class v-if="swiperOption">
					<swiper-slide class="product-video" v-if="hasVideo">
						<video v-if="index ==0 " :src="productDetail.video" id="p-video" v-for="(item,index) in productDetail.exhibit" :poster="item" preload="none"></video>
						<i class="play-video" v-if="!isPlaying" @click="videoPlayAndStop"><img src="../assets/image/b-play.png" alt=""></i>
						<i class="stop-video" v-if="isPlaying" @click="videoPlayAndStop"><img src="../assets/image/b-stop.png" alt=""></i>
				 	</swiper-slide>	
		          <swiper-slide v-for="items in productDetail.exhibit">
		            <img v-bind:src="items" alt="">
		          </swiper-slide>
		          <div class="swiper-pagination" slot="pagination"></div>
			    </swiper>
			</div>
			<div class="product-inf">
				<p class="product-title" v-text="productDetail.title"></p>
				<ul class="product-num-block clearfix">
					<li class="product-num">参考价：<span v-text="productDetail.price"></span>元 / {{productDetail.units}}</li>
					<li class="product-set">起订量：{{productDetail.moq}}</li>
				</ul>
			</div>
			<ul class="product-attributes">
				<li v-for="item in productDetail.all_type"><span>{{item.title}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</li>
			</ul>
			<div v-if="productDetail.is_sample==1">
				<div class="product-sample-block clearfix">
					<span>产品样品</span>
					<a href="javascript:void(0)" @click="showDia">立即取样</a>
				</div>
				<ul class="product-attributes">
					<li class="ellipsis"><span>样品名称：</span>&nbsp;&nbsp;{{productDetail.sample_name}}</li>
					<li><span>样品价格：</span>&nbsp;&nbsp;<span class="attr-price">￥{{productDetail.sample_price}}</span></li>
					<li><span>样品邮费：</span>&nbsp;&nbsp;<span class="attr-label"v-if="productDetail.postage==1">包邮</span><span class="attr-label"v-if="productDetail.postage==2">不包邮</span></li>
					<li><span>取样方式：</span>&nbsp;&nbsp;<span class="attr-label" v-if="productDetail.sampling_method==1">免费取样</span><span class="attr-label" v-if="productDetail.sampling_method==2">收费取样</span></li>
					<li class="sample-tips">提示：完善公司信息并完成认证后可以免费取样。</li>
				</ul>
			</div>
			<div class="product-com">
				<i class="product-com-logo"><img :src="productDetail.logo" alt=""></i>
				<div class="prduct-com-inf">
					<p class="product-com-title ellipsis" v-text="productDetail.companyname"></p>
					<div class="product-com-wrap">
						<span class="product-com-type product-com-type1" v-if="productDetail.com_pattern==1">采购商</span>
						<span class="product-com-type product-com-type2" v-if="productDetail.com_pattern==2">供应商</span>
						<span class="product-com-level product-com-level1" v-if="productDetail.mfrs_level==1">认证厂家</span>
						<span class="product-com-level product-com-level2" v-if="productDetail.mfrs_level==2">优质厂家</span>
						<span class="product-com-level product-com-level3" v-if="productDetail.mfrs_level==3">实力厂家</span>
					</div>
				</div>
			</div>
			<div class="p-com-inf">
				<ul class="p-com-ul">
					<li>
						<span>{{productDetail.attention_num}}</span>
						<p>关注人数</p>
					</li>
					<li class="p-com-border">
						<span>{{productDetail.all_product_num}}</span>
						<p>全部产品</p>
					</li>
					<li>
						<span>{{productDetail.new_product_num}}</span>
						<p>最新产品</p>
					</li>
				</ul>
				<div class="p-com-service">
					<a href="javascript:void(0)" @click="showDia">企业客服</a>
					<router-link :to="{name:'companyHome',params:{id:productDetail.comid}}">企业主页</router-link>
				</div>

			</div>
			<div class="drag" v-if="false">
				<p>继续拖动 查看图文详情</p>
			</div>
			<div class="p-com-bottom" @click="showDia">
				<a href="javascript:void(0)" class="collect-product">
					<i><img src="../assets/image/collect-product.png" alt=""></i>
					<p>收藏产品</p>
				</a>
				<a href="javascript:void(0)" class="take-sample" v-if="productDetail.is_sample==1">
					<i><img src="../assets/image/take-sample.png" alt=""></i>
					<p>获取样品</p>
				</a>
				<a href="javascript:void(0)" class="contact-company" :class='{noSample:productDetail.is_sample==0}'>联系商谈</a>
			</div>
		</div>
		<div class="showH5" v-html="pH5" v-if="isH5"></div>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
		<!--分享-->
		<share @click.stop=""></share>
	</div>
</template>
<script src="../js/productDetail.js"></script>
<style scoped src="../css/productDetail.css"></style>

