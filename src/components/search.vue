<template>
	<!--历史搜索在本地做，存储最新的5条 localStorage 本地永久存储 sessionStorage 回话存储-->
	<div class="search">
		<header class="search-header">
				<div class="search-wrap">
					<i class="search-icon"></i>
					<input type="text" class="search-input" v-model="keyword" placeholder="搜索产品/供应商">
				</div>
				<router-link class="to-back" to="/"></router-link>
				<a class="go-search" href="javascipt:void(0)" @click="goSearch()">搜索</a>
		</header>
		<div class="search-type clearfix">
			<a href="javascipt:void(0)" @click="searchToggle(1)" v-bind:class='{active:isProduct}'>搜产品</a>
			<a href="javascipt:void(0)" @click="searchToggle(2)" v-bind:class='{active:!isProduct}'>搜企业</a>
		</div>
		<div class="hot-search" v-if="isProduct">
			<p class="hot-title">热搜产品</p>
			<ul class="hot-list clearfix">
				<li class="hot-item" v-for="item in hotKeyProduct"><router-link :to="{name:'productList',params:{keyword:item}}" v-text="item"></router-link></li>
			</ul>
		</div>
		<div class="hot-search" v-if="!isProduct">
			<p class="hot-title">热搜企业</p>
			<ul class="hot-list clearfix">
				<li class="hot-item" v-for="item in hotKeyCom"><a href="#" v-text="item"></a></li>

			</ul>
		</div>
		<div class="history-search">
			<p class="history-top">
				<span>历史搜索</span>
				<span class="delete-history" @click="beforeDelete()"></span>
			</p>
			<ul class="hitory-list">
				<li v-if="isProduct" v-for="item in historyProduct">
				<router-link  class="hitory-item" :to="{name:'productList',params:{keyword:item}}" v-text="item"></router-link >
				</li>
				<li v-if="!isProduct" v-for="item in historyCom"><a class="hitory-item" href="#" v-text="item"></a></li>
			</ul>
		</div>
		<!--弹窗组件-->
		<dialogue v-bind:modal-title="modalTitle" ok-btn="确定" cancel-btn="取消" v-on:cancel="hideDialogue" v-on:sureOpt="deleteHistory" v-if="!isHide"></dialogue>
	</div>
</template>
<script src="../js/search.js"></script>