<template>
	<div class="com-introduction" @click="hideShare">
		<!--头部-->
		<header class="com-introduction-header">
			<p class="h-title">企业介绍
			</p>
			<a class="to-back" @click="goBack"></a>
			<a class="share-icon" @click.stop="goShare" href="javascipt:void(0)"></a>
		</header>
		<div class="com-inf-type clearfix">
			<a :class="{active:type==1}" @click="changeType(1)" href="javascipt:void(0)">基础信息</a>
			<a :class="{active:type==2}" @click="changeType(2)" href="javascipt:void(0)">认证信息</a>
		</div>
		<div :class="{hideCla:type==2}">
			<div class="com-inf-top clearfix">
				<i class="com-log"><img :src="comData.logo" alt=""></i>
				<div class="com-content">
					<p class="com-name" v-text="comData.companyname"></p>
					<span v-if="comData.pattern==1" class="company-type company-type3">品牌商</span>
					<span v-if="comData.pattern==2" class="company-type company-type3">服务商</span>
					<span v-if="comData.pattern==3" class="company-type company-type2">制造商</span>
					<span v-if="comData.mfrs_level==1" class="company-level company-level1"></span>
					<span v-if="comData.mfrs_level==2" class="company-level company-level2"></span>
					<span v-if="comData.mfrs_level==3" class="company-level company-level3"></span>
				</div>
			</div>
			<p class="inf-title">基本信息</p>
			<ul clas=inf-list>
				<li class="inf-item">企业类型：&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.pattern_name"></span></li>
				<li class="inf-item">主营品类：&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.catname">OEM/ODM</span></li>
				<li class="inf-item">企业电话：&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.company_phone">12457888</span></li>
				<li class="inf-item">所在地区：&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.areaname">广东省 广州市</span></li>
				<li class="inf-item">企业地址：&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.address">中山大道123号</span></li>
			</ul>
			<div v-if="isMap">
				<p class="inf-title">企业位置</p>
				<div class="inf-map">
					<div class="see-map" @click="showDia"><span>查看完整地图</span></div>
					<div id="comMap"></div>
				</div>
			</div>
			<p class="inf-con-title">企业简介<i class="down-icon" :class="[isShowContent?'active':'']" @click="downContent"></i></p>
			<div class="inf-con" v-show="isShowContent" v-text="comData.introduce">企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介</div>
		</div>
		<div :class="{hideCla:type==1}">
			<ul class="com-veri-top">
				<li>
					企业认证
					<span class="cert-status1" v-if="comData.yp_status==1">已认证</span>
					<span class="cert-status1" v-if="comData.yp_status==2">认证中</span>
					<span class="cert-status1" v-if="comData.yp_status==3">认证失败</span>
				</li>
				<li>
					实地验厂
					<span class="cert-status2" v-if="comData.c_status==1">已验厂</span>
					<span class="cert-status2" v-if="comData.c_status==0">未验厂</span>
				</li>
			</ul>
			<div class="con-veri-title clearfix">
				<p class="con-veri-left">工商注册信息</p>
				<p class="con-veri-right">工商注册信息由企查查认证提供</p>
			</div>
			<ul class="inf-list veri-list">
				<li class="inf-item">企业名称&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.com_name"></span></li>
				<li class="inf-item">注册地址&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.c_address"></span></li>
				<li class="inf-item">注 册 号&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.number"></span></li>
				<!-- <li class="inf-item">登记机关&nbsp;&nbsp;&nbsp;<span class="veri-f">广东省 广州市 工商局</span></li> -->
				<li class="inf-item">成立日期&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.set_up_time"></span></li>
				<li class="inf-item">营业期限&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.term_time"></span></li>
				<li class="inf-item">法人代表&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.legal_person"></span></li>
				<li class="inf-item">经营范围&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.products"></span></li>
			</ul>
			<div class="con-veri-title clearfix">
				<p class="con-veri-left">工厂属性信息</p>
				<p class="con-veri-right">本信息由平台实地验厂认证提供</p>
			</div>
			<ul class="inf-list veri-list">
				<li class="inf-item">强势产品&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.strong_pro"></span></li>
				<li class="inf-item">业务模式&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.yw_model"></span></li>
				<li class="inf-item">自有品牌&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.self_brand">无</span></li>
				<li class="inf-item">强项渠道&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.strong_channel"></span></li>
				<li class="inf-item">工厂地址&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.gc_address"></span></li>
				<li class="inf-item">工厂员工&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.gc_member"></span></li>
				<li class="inf-item">研发团队&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.yf_team"></span></li>
				<li class="inf-item">厂房面积&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.plant_area"></span></li>
				<li class="inf-item">主要设备&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.equipment"></span></li>
				<li class="inf-item">日 产 量&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.production"></span></li>
				<li class="inf-item">相关认证&nbsp;&nbsp;&nbsp;<span class="veri-f" v-text="comData.relevant_cer"></span></li>
				<li class="inf-item">
					企业荣誉
					<ul class="clearfix com-honor-list">
						<li class="com-honor-item" v-for="item in comData.com_thumb"><img v-lazy="item" alt=""></li>
					</ul>
				</li>
			</ul>
		</div>
		<footer class="companyHome-foot">
			<router-link :to='{name:"companyHome",params:{id:$route.params.id}}' class="go-introduce">企业主页</router-link>
			<a href="javascipt:void(0)" class="link-introduce" @click="showDia">联系商谈</a>
		</footer>
		<!--弹窗组件-->
		<dialogue modal-title="请下载APP以获得更多体验" ok-btn="我要下载" cancel-btn="我再想想" v-on:cancel="hideDialogue" v-on:sureOpt="downAPP" v-if="isShowDia"></dialogue>
		<!--分享-->
		<share @click.stop=""></share>
		
	</div>
</template>
<script src="../../js/company/companyIntroduction.js"></script>
<style scoped src="../../css/company/companyIntroduction.css"></style>