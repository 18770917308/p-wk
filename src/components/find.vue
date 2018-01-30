<template>
	<div class="find">
			<!--头部-->
		<header class="find-header">
			<p class="h-title">发现</p>
			<a class="scan-icon" href="javascipt:void(0)" @click="showDia"></a>
			<a class="inf-icon" href="javascipt:void(0)" @click="showDia"></a>
		</header>
		<ul class="find-top">
			<li class="find-top-label" :class='{active:findModule==1}' @click="choseModule(1)">
				<i><img src="../assets/image/icon-like.png" alt=""></i>
				<p>猜你喜欢</p>
			</li>
			<li class="find-top-label" :class='{active:findModule==2}' @click="choseModule(2)">
				<i><img src="../assets/image/icon-headline.png" alt=""></i>
				<p>微库头条</p>
			</li>
			<li class="find-top-label" :class='{active:findModule==3}' @click="choseModule(3)">
				<i><img src="../assets/image/icon-addr.png" alt=""></i>
				<p>附近企业</p>
			</li>
			<li class="find-top-label" :class='{active:findModule==4}' @click="choseModule(4)">
				<i><img src="../assets/image/icon-mineBuy.png" alt=""></i>
				<p>求购中心</p>
			</li>
		</ul>
		<!--微库头条-->
		<div v-if="findModule==2">
			<div class="z-essay"><p>微库征文</p></div>
			<ul class="headline-list">
				<li v-for="item in news">
					<router-link :to="{name:'newsDetail',params: {id:item.list_id}}" class="headline-item clearfix">
						<div class="headline-left">
							<p class="headline-title" v-text="item.title"></p>
							<div class="headline-line clearfix">
								<span class="headline-label" v-text="item.catname"></span>
								<span class="headline-time" v-text="item.inputtime"></span>
							</div>
						</div>
						<i class="headline-img"><img v-lazy="item.img" alt=""></i>
					</router-link>
				</li>
			</ul>
		</div>
		<ul class="nearby-company" v-if="findModule==3">
			<li class="nearby-company-item" v-for="item in nearbyCom">
				<router-link :to="{name:'companyHome',params: {id:item.com_id}}" class="clearfix">
					<i class="nearby-company-logo"><img v-lazy="item.logo" alt=""></i>
					<div class="nearby-company-content">
						<p class="nearby-company-title ellipsis" v-text="item.companyname"></p>
						<p class="nearby-company-addr ellipsis" v-text="item.areaname">广州市天河区</p>
						<div>
							<span v-if="item.pattern==1" class="company-type company-type3">品牌商</span>
							<span v-if="item.pattern==2" class="company-type company-type3">服务商</span>
							<span v-if="item.pattern==3" class="company-type company-type2">制造商</span>
							<span v-if="item.mfrs_level==1" class="company-level company-level1"></span>
							<span v-if="item.mfrs_level==2" class="company-level company-level2"></span>
							<span v-if="item.mfrs_level==3" class="company-level company-level3"></span>
						</div>
						<div class="nearby-company-map clearfix">
							<span class="nearby-company-distance">{{item.distance}}m</span>
							<a href="javascipt:void(0)" class="nearby-nav-btn" @click.stop="showDia">导航</a>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<!--求购中心-->
		<div class="buy-list" v-if="findModule==4">
			<router-link :to="{name:'buyDetail',params: {id:item.buyid}}" class="buy-item" v-for="item in buyData">
				<ul>
					<li class="buy-title ellipsis" v-text="item.title"></li>
					<li class="buy-num">{{item.number}}{{item.units}}</li>
					<li class="buy-type" v-text="item.catname"></li>
					<li class="buy-outtime" v-text="item.outtime"></li>
					<li class="buy-inf">
						<span class="buy-attention">关注：{{item.attention_count}}</span>
						<span class="buy-contact">商谈：{{item.discuss_count}}</span>
						<span class="buy-price">报价：{{item.quoter_count}}</span>
					</li>
				</ul>
			</router-link>
		</div>
		<is-end v-if="isPageEnd1 && findModule==2 || isPageEnd2 && findModule==4" msg="没有更多了"></is-end>
		<footer>
			<ul class="foot-menu clearfix">
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon mall-icon"></i>
						<p class="foot-w">商城</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<router-link to="/find">
						<i class="foot-icon find-icon active"></i>
						<p class="foot-w">发现</p>
					</router-link>
				</li>
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon contact-icon"></i>
						<p class="foot-w">商谈</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon account-icon"></i>
						<p class="foot-w">账号</p>
					</a>
				</li>
			</ul>
			<div id="c_map" style="width:0;height:0"></div>
		</footer>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
	</div>
</template>
<script src="../js/find.js"></script>
<style scoped src="../css/find.css"></style>