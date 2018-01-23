<template>
	<div class="companyList">
		<header class="search-header">
				<div class="search-wrap" @click="goSearch">
					<i class="search-icon"></i>
					<input type="text" class="search-input">
					<div class="search-keyword" v-if="keyword">
						<span class="keyword">{{keyword}}</span>
						<span class="delete-keyword">×</span>
					</div>
				</div>
				<router-link class="to-back" to="/"></router-link>
		</header>
		<ul class="fliter-company clearfix">
			<li :class='{active:searchType==1}' @click="choseSearchType(1)">综合</li>
			<li :class='{active:searchType==2}' @click="choseSearchType(2)">新品</li>
			<li>筛选</li>
		</ul>
		<ul class="companys">
			<li class="rec-item" v-for="item in companys">
				<router-link to="/company/companyHome" class="clearfix">
					<i class="rec-img"><img v-lazy="item.logo" alt=""></i>
					<div class="rec-con">
						<p class="rec-con-title ellipsis" v-text="item.companyname"></p>
						<p class="rec-con-addr ellipsis" v-text="item.areaname"></p>
						<!-- <span class="rec-con-sign company-ver">企业认证</span> -->
						<p class="rec-con-main rec-con-major">主营：{{item.catname}}</p>
						<div class="com-wrap">
							<span class="com-type com-type1" v-if="item.pattern==1">品牌商</span>
							<span class="com-type com-type2" v-if="item.pattern==2">服务商</span>
							<span class="com-type com-type3" v-if="item.pattern==3">制造商</span>
							<span class="com-level com-level1" v-if="item.mfrs_level==1">认证厂家</span>
							<span class="com-level com-level2" v-if="item.mfrs_level==2">优质厂家</span>
							<span class="com-level com-level3" v-if="item.mfrs_level==3">实力厂家</span>
						</div>
						<div class="cert-status">
							<span class="cert-status1" v-if="item.cert_status==1">企业认证</span>
							<span class="cert-status2"  v-if="item.inspection==1">实地验厂</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		<is-end v-if="isPageEnd" msg="没有更多了"></is-end>
	</div>
</template>
<script src="../js/companyList.js"></script>