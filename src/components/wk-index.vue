<template>
	<div class="wk-index">
		<div class="wrapper">
			<!--头部-->
			<header>
				<div class="search-wrap">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商">
				</div>
				<a class="scan-icon" href="javascipt:void(0)"></a>
				<a class="inf-icon" href="javascipt:void(0)"></a>
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
					<a href="#" class="kinds-link">
						<i><img src="../assets/image/icon-allkinds.png" alt=""></i>
						<p>全部分类</p>
					</a>
				</li>
				<li class="kinds-item">
					<a href="#" class="kinds-link">
						<i><img src="../assets/image/icon-cart.png" alt=""></i>
						<p>新品上架</p>
					</a>
				</li>
				<li class="kinds-item">
					<a href="#" class="kinds-link">
						<i><img src="../assets/image/icon-buy.png" alt=""></i>
						<p>一键求购</p>
					</a>
				</li>
				<li class="kinds-item">
					<a href="#" class="kinds-link">
						<i><img src="../assets/image/icon-mineBuy.png" alt=""></i>
						<p>我的求购</p>
					</a>
				</li>
			</ul>
			<!--分类-->
			<div class="our-major">
				<ul class="major-block-1">
					<li class="major-1 major-item-1">
						<a href="#">
							<p>OEM/ODM</p>
							<div>
								<img src="../assets/image/img-prod2.png" alt="">
							</div>
							
						</a>
					</li>
					<li class="major-item-1">
						<ul class="major-block-2">
							<li class="major major-2">
								<router-link to="/hello">
									<div class="major-title">包材/辅材</div>
									<div class="major-img"><img src="../assets/image/img-prod1.png" alt=""></div>
								</router-link>
							</li>
							<li class="major major-3">
								<a href="#">
									<div class="major-title">设计/版权</div>
									<div class="major-img"><img src="../assets/image/img-prod3.png" alt=""></div>
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="major-block-3">
					<li class="major major-4">
						<a href="#">
							<div class="major-title">美容/仪器</div>
							<div class="major-img"><img src="../assets/image/img-prod5.png" alt=""></div>
						</a>
					</li>
					<li class="major major-5">
						<a href="#">
							<div class="major-title">营销/推广</div>
							<div class="major-img"><img src="../assets/image/img-prod4.png" alt=""></div>
						</a>
					</li>
				</ul>
			</div>
			<ul class="supply-wrap">
				<li class="supply-1">
					<a href="#">
						<p class="supply-title">热门供应</p>
						<span class="supply-con">爆款产品 市场热销</span>
						<div class="supply-img"><img src="../assets/image/img-prod6.png" alt=""></div>
					</a>
				</li>
				<li class="supply-2">
					<a href="#">
						<p class="supply-title">样品中心</p>
						<span class="supply-con">样品免费拿</span>
						<div class="supply-img"><img src="../assets/image/icon-exam.png" alt=""></div>
					</a>
				</li>
				<li class="supply-3">
					<a href="#">
						<p class="supply-title">优质企业</p>
						<span class="supply-con">服务有保障</span>
						<div class="supply-img"><img src="../assets/image/icon-company.png" alt=""></div>
					</a>
				</li>
			</ul>
			<!--推荐-->
			<div class="rec-title clearfix">
				<span class="rec-left">为您推荐</span>
				<a href="#" class="rec-right">关注的品类 >></a>
			</div>
			<div class="rec-wrap">
				<div class="rec-tog">
					<span class="rec-tog-btn" v-bind:class="{active:!isCom}" @click="recToggle('product')">推荐产品</span>
					<span class="rec-tog-btn" v-bind:class="{active:isCom}" @click="recToggle('company')">推荐企业</span>
				</div>
				<ul class="rec-item-list" v-if="!isCom" v-for="item in recPro">
					<li class="rec-item">
						<a href="" class="clearfix">
							<i class="rec-img"><img v-bind:src="item.thumb" alt=""></i>
							<div class="rec-con">
								<p class="rec-con-title ellipsis">{{item.title}}</p>
								<p class="rec-con-addr ellipsis">{{item.areaname}}</p>
								<span class="rec-con-sign prod-exam">免费取样</span>
								<p class="rec-con-main rec-con-price">{{item.price}}</p>
							</div>
						</a>
					</li>
				</ul>
				<ul class="rec-item-list" v-if="isCom" v-for="item in recCompany">
					<li class="rec-item">
						<a href="" class="clearfix">
							<i class="rec-img"><img v-bind:src="item.logo" alt=""></i>
							<div class="rec-con">
								<p class="rec-con-title ellipsis">{{item.companyname}}</p>
								<p class="rec-con-addr ellipsis">{{item.areaname}}</p>
								<span class="rec-con-sign company-ver">企业认证</span>
								<p class="rec-con-main rec-con-major">主营：{{item.catname}}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="rec-tips-wrap" v-if='isPageEnd2 && isCom || isPageEnd1 && !isCom'>
				<ul class="rec-tips clearfix">
					<li class="line-left"></li>
					<li class="tips-con">暂无更多推荐</li>
					<li class="line-right"></li>
				</ul>
			</div>
			<div class="loading" v-if='isLoadingMore && !isPageEnd2 && isCom || isLoadingMore && !isPageEnd1 && !isCom'>Loading...</div>
		</div>
		<footer>
			<ul class="foot-menu clearfix">
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon"><img src="../assets/image/icon-index.png" alt=""></i>
						<p class="foot-w">商城</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon"><img src="../assets/image/icon-find.png" alt=""></i>
						<p class="foot-w">发现</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon"><img src="../assets/image/icon-msg.png" alt=""></i>
						<p class="foot-w">商谈</p>
					</a>
				</li>
				<li class="foot-menu-item">
					<a href="">
						<i class="foot-icon"><img src="../assets/image/icon-account.png" alt=""></i>
						<p class="foot-w">账号</p>
					</a>
				</li>
			</ul>
		</footer>
	</div>
</template>
<script src="../js/wk-index.js"></script>
