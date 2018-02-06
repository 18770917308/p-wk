<template>
	<div class="wk-index">
		<div class="wrapper">
			<!--头部-->
			<header class="header">
				<div class="search-wrap">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商" @click="goSearch()">
				</div>
				<a class="scan-icon" href="javascipt:void(0)" @click="showDia"></a>
				<a class="inf-icon" href="javascipt:void(0)" @click="showDia"></a>
			</header>
			<!--轮播图-->
			<div class="banner-wrap">
				<div class="swiper-box">
			        <swiper :options="swiperOption" ref="mySwiper1" :class v-if="swiperOption">
			          <swiper-slide v-for="items in indexObj1.ad_code">
			            <img v-bind:src="items" alt="">
			          </swiper-slide>
			          <div class="swiper-pagination" slot="pagination"></div>
			        </swiper>
			    </div>
			</div>
			<ul class="product-kinds clearfix">
				<li class="kinds-item">
					<router-link to="/category" class="kinds-link">
						<i><img src="../assets/image/icon-allkinds.png" alt=""></i>
						<p>全部分类</p>
					</router-link>
				</li>
				<li class="kinds-item">
					<router-link to="/newProduct" class="kinds-link">
						<i><img src="../assets/image/icon-cart.png" alt=""></i>
						<p>新品上架</p>
					</router-link>
				</li>
				<li class="kinds-item">
					<router-link to="/find/4" class="kinds-link">
						<i><img src="../assets/image/icon-buy.png" alt=""></i>
						<p>一键求购</p>
					</router-link>
				</li>
				<li class="kinds-item">
					<router-link to="/find/4" class="kinds-link">
						<i><img src="../assets/image/icon-mineBuy.png" alt=""></i>
						<p>我的求购</p>
					</router-link>
				</li>
			</ul>
			<!--分类-->
			<div class="our-major">
				<ul class="major-block-1">
					<li class="major-1 major-item-1">
						<router-link to="/productList/OEM">
							<p>OEM/ODM</p>
							<div>
								<img src="../assets/image/img-prod2.png" alt="">
							</div>
							
						</router-link>
					</li>
					<li class="major-item-1">
						<ul class="major-block-2">
							<li class="major major-2">
								<router-link to="/productList/包材">
									<div class="major-title">包材/辅材</div>
									<div class="major-img"><img src="../assets/image/img-prod1.png" alt=""></div>
								</router-link>
							</li>
							<li class="major major-3">
								<router-link to="/productList/设计">
									<div class="major-title">设计/版权</div>
									<div class="major-img"><img src="../assets/image/img-prod3.png" alt=""></div>
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="major-block-3">
					<li class="major major-4">
						<router-link to="/productList/美容">
							<div class="major-title">美容/仪器</div>
							<div class="major-img"><img src="../assets/image/img-prod5.png" alt=""></div>
						</router-link>
					</li>
					<li class="major major-5">
						<router-link to="/productList/营销">
							<div class="major-title">营销/推广</div>
							<div class="major-img"><img src="../assets/image/img-prod4.png" alt=""></div>
						</router-link>
					</li>
				</ul>
			</div>
			<ul class="supply-wrap">
				<li class="supply-1">
					<router-link to="hotsupply">
						<p class="supply-title">热门供应</p>
						<span class="supply-con">爆款产品 市场热销</span>
						<div class="supply-img"><img src="../assets/image/img-prod6.png" alt=""></div>
					</router-link>
				</li>
				<li class="supply-2">
					<router-link to="/samplecenter">
						<p class="supply-title">样品中心</p>
						<span class="supply-con">样品免费拿</span>
						<div class="supply-img"><img src="../assets/image/icon-exam.png" alt=""></div>
					</router-link>
				</li>
				<li class="supply-3">
					<router-link to="excellentCom">
						<p class="supply-title">优质企业</p>
						<span class="supply-con">服务有保障</span>
						<div class="supply-img"><img src="../assets/image/icon-company.png" alt=""></div>
					</router-link>
				</li>
			</ul>
			<!--推荐-->
			<div class="rec-title clearfix">
				<span class="rec-left">为您推荐</span>
				<!-- <a href="#" class="rec-right">关注的品类 >></a> -->
			</div>
			<div class="rec-wrap">
				<div class="rec-tog">
					<span class="rec-tog-btn" v-bind:class="{active:!isCom}" @click="recToggle('product')">推荐产品</span>
					<span class="rec-tog-btn" v-bind:class="{active:isCom}" @click="recToggle('company')">推荐企业</span>
				</div>
				<ul class="rec-item-list" v-if="!isCom" v-for="item in recPro">
					<li class="rec-item">
						<router-link :to="{name:'productDetail',params: {id:item.product_id}}" class="clearfix">
							<i class="rec-img"><img v-lazy="item.thumb" alt=""></i>
							<div class="rec-con">
								<p class="rec-con-title ellipsis" v-text="item.title"></p>
								<p class="rec-con-addr ellipsis" v-text="item.areaname"></p>
								<span class="rec-con-sign prod-exam">免费取样</span>
								<p class="rec-con-main rec-con-price" v-text="item.price"></p>
							</div>
						</router-link>
					</li>
				</ul>
				<ul class="rec-item-list" v-if="isCom">
					<li class="rec-item" v-for="item in recCompany">
						<router-link :to="{name:'companyHome',params: {id:item.comid}}" class="clearfix">
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
								<div class="cert-status" v-if="item.cert_status==1">
									<span class="cert-status1">企业认证</span>
									<span class="cert-status2">实地验厂</span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<is-end v-if='isPageEnd2 && isCom || isPageEnd1 && !isCom' v-bind:msg="msg"></is-end>
			<div class="loading" v-if='isLoadingMore && !isPageEnd2 && isCom || isLoadingMore && !isPageEnd1 && !isCom'>Loading...</div>
		</div>
		<footer>
			<ul class="foot-menu clearfix">
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon mall-icon active"></i>
						<p class="foot-w">商城</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<router-link to="/find/2">
						<i class="foot-icon find-icon"></i>
						<p class="foot-w">发现</p>
					</router-link>
				</li>
				<li class="foot-menu-item">
					<a href="javascipt:void(0)" @click="showDia">
						<i class="foot-icon contact-icon"></i>
						<p class="foot-w">商谈</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<a href="javascipt:void(0)" @click="showDia">
						<i class="foot-icon account-icon"></i>
						<p class="foot-w">账号</p>
					</a>
				</li>
			</ul>
		</footer>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
	</div>
</template>
<script src="../js/wk-index.js"></script>
<style scoped src="../css/wk-index.css"></style>
