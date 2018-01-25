<template>
	<div class="sample">
		<div class="sample-wrapper">
			<header class="sample-top">
				<p>样品中心</p>
				<a class="to-back" @click="goBack"></a>
			</header>
			<ul class="sample-list">
				<li v-for="item in sample"> 
					<router-link :to="{name:'productDetail',params: {id:item.productid}}" class="sample-item clearfix">
						<i class="sample-img"><img v-lazy="item.thumb"></i>
						<div class="sample-con">
							<p class="sample-name ellipsis" v-text="item.title">title</p>
							<p class="sample-type">{{item.sample_name}}</p>
							<p class="get-sample">
								<span v-if="item.sampling_method==1">免费取样&nbsp;&nbsp;</span>
								<span v-if="item.sampling_method==2">收费取样&nbsp;&nbsp;</span>
								<span v-if="item.postage==1"> 包邮</span>
								<span v-if="item.postage==2"> 不包邮</span>
								<a href="javascript:void(0)" @click.stop="showDia" class="sample-btn">申请拿样</a>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
			<is-end v-if="isPageEnd" v-bind:msg="msg"></is-end>
		</div>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
	</div>
</template>
<script src="../js/samplecenter.js"></script>
<style scoped src="../css/samplecenter.css"></style>