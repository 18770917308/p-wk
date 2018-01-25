<template>
	<div class="buyDetail">
		<!--头部-->
		<header class="buyDetail-header">
			<a class="to-back" @click="goBack"></a>
			<p class="h-title">求购详情</p>
		</header>
		<a class="buyer">
			<i class="buyer-img"><img :src="buyDetail.avatar" alt=""></i>
			<span class="buyer-name" v-text="buyDetail.username">刘先生</span>
			<span class="buyer-verification" v-if="buyDetail.memberCertificateStatus==1">实名认证</span>
			<i class="buyer-link"></i>
		</a>
		<div class="buy-content">
			<p class="buy-con-title ellipsis" v-text="buyDetail.title">求购面膜片</p>
			<p class="buy-con-line">求购类型：{{buyDetail.catname}}</p>
			<p class="buy-con-line">求购数量：<span class="high-color">{{buyDetail.number}}{{buyDetail.units}}</span></p>
			<p class="buy-con-line">有效时间：{{buyDetail.outtime}}</p><!--剩余<span class="high-color">1</span>天有效-->
			<p class="buy-con-line">详细需求：</p>
			<div class="con-detail" v-html="buyDetail.content"></div>
			<!-- <ul class="clearfix but-con-img">
				<li v-for="item in buyDetail.thumb"><img v-lazy="item" alt=""></li>
				<li><img v-lazy="item" alt="1"></li>
				<li><img v-lazy="item" alt="2"></li>
				<li><img v-lazy="item" alt="3"></li>
			</ul> -->
			<ul class="clearfix but-con-img">
				<li v-for="(item,index) in buyDetail.thumb"><img v-bind:src="item" alt="1"></li>
			</ul>
		</div>
		<div class="buy-con-inf">
			<span class="buy-con-attention">关注：{{buyDetail.attention_count}}</span>
			<span class="buy-con-contact">商谈：{{buyDetail.discuss_count}}</span>
			<span class="buy-con-price">报价：{{buyDetail.quoter_count}}</span>
		</div>
		<footer class="buy-con-foot">
			<button class="buy-foot-attention"><img src="../assets/image/collect-product.png" alt=""></button>
			<button class="quote">立即报价</button>
			<button class="buy-foot-contact">联系商谈</button>
		</footer>
	</div>
</template>
<script src="../js/buyDetail.js"></script>
<style scoped src="../css/buyDetail.css"></style>