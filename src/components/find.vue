<template>
	<div class="find">
		<!--头部-->
		<header class="find-header">
			<p class="h-title">发现</p>
			<a class="scan-icon" href="javascipt:void(0)"></a>
			<a class="inf-icon" href="javascipt:void(0)"></a>
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
		</footer>
	</div>
</template>
<script src="../js/find.js"></script>
<style scoped src="../css/find.css"></style>