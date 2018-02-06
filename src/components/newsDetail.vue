<template>
	<div class="newsDetail" @click="hideShare">
		<!--头部-->
		<header class="newsDetail-header">
			<p class="h-title">资讯详情</p>
			<a class="to-back" @click="goBack"></a>
			<a class="share-icon" @click.stop="goShare" href="javascipt:void(0)"></a>
		</header>
		<div class="newsDetail-content" v-html="newsDetail">
			
		</div><!-- 
		<div>
			<p class="recommend-line">为您推荐</p>
		</div>
		<ul class="n-1">
			<li class="n-item">
				<router-link :to="{name:'productDetail',params: {id:111}}" class="n-link clearfix">
					<i class="n-img"><img src="../assets/image/img1.jpg" alt=""></i>
					<div class="n-con">
						<p class="n-con-title">面膜面膜</p>
						<a class="n-con-sign prod-exam">免费取样</a>
						<p class="n-con-main n-con-price">1.55/张</p>
					</div>
				</router-link>
			</li>
		</ul> -->
		<!--分享-->
		<share @click.stop=""></share>
	</div>
</template>
<script src="../js/newsDetail.js"></script>
<style scoped src="../css/newsDetail.css"></style>