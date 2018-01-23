<template>
	<div class="companyHome">
		<header class="search-header">
				<div class="search-wrap" @click="">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商">
				</div>
				<router-link class="to-back" to="/"></router-link>
				<i class="share-icon"></i>
		</header>
		<div class="company-top">
			<div class="company-top-con clearfix">
				<div class="company-inf">
					<i class="company-logo"><img src="../../assets/image/company-logo.png" alt=""></i>
					<div class="company-sign">
						<p class="company-name ellipsis">企业名称</p>
						<span class="company-type company-type3" ></span>
						<span class="company-level company-level3"></span>
					</div>
				</div>
				<ul class="attention">
					<li class="attention-num">1.1万人</li>
					<li class="attention-btn">关注</li>
				</ul>
			</div>
		</div>
		<ul class="company-nav">
			<li>企业展厅</li>
			<li class="active">全部产品</li>
			<li>新品上架</li>
		</ul>
		<ul class="company-products" v-if="false">
			<li class="company-products-item">
				<a href="#" class="company-products-link clearfix">
					<i class="company-products-img"><img src="../../assets/image/sample.png" alt=""></i>
					<div class="company-products-con">
						<p class="company-products-title">好面膜好面膜好面膜好面膜好面膜好面膜</p>
						<a class="company-products-sign prod-exam">免费取样</a>
						<p class="company-products-main company-products-price">1.50/张</p>
					</div>
				</a>
			</li>
		</ul>
		<div class="company-hall">
			<p class="hall-title">企业全景</p>
			<div class="hall-content">
				<img class="panoramic-img" src="../../assets/image/panoramic.png" alt="">
				<i class="icon-panoramic"><img src="../../assets/image/icon-panoramic.png" alt=""></i>
			</div>
			<p class="hall-title">企业专访</p>
			<div class="hall-content">
				<video src="" width=100% style="background:#d1d1d1;"></video>
				<i class="video-btn icon-play"><img src="../../assets/image/b-play.png" alt=""></i>
				<i class="video-btn icon-play" v-if="false"><img src="../../assets/image/b-stop.png" alt=""></i>
			</div>
			<p class="hall-title">精品推荐</p>
		</div>
	</div>
</template>