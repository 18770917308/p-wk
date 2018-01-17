<template>
	<div class="sample">
		<div class="sample-wrapper">
			<header class="sample-top">
				<p>样品中心</p>
				<router-link class="to-back" to="/"></router-link>
			</header>
			<ul class="sample-list">
				<li v-for="item in sample"> 
					<router-link to="/category" class="sample-item clearfix">
						<i class="sample-img"><img v-lazy="item.thumb"></i>
						<div class="sample-con">
							<p class="sample-name ellipsis" v-text="item.title">title</p>
							<p class="sample-type">{{item.sample_name}}</p>
							<p class="get-sample">
								<span v-if="item.sampling_method==1">免费取样&nbsp;&nbsp;</span>
								<span v-if="item.sampling_method==2">收费取样&nbsp;&nbsp;</span>
								<span v-if="item.postage==1"> 包邮</span>
								<span v-if="item.postage==2"> 不包邮</span>
								<router-link to="/" class="sample-btn">申请拿样</router-link>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
			<is-end v-if="isPageEnd" v-bind:msg="msg"></is-end>
		</div>
	</div>
</template>
<script src="../js/samplecenter.js"></script>