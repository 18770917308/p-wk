<template>
	<div class="total-kinds">
		<div class="kinds-wrap">
			<header class="header">
				<div class="search-wrap">
					<i class="search-icon"></i>
					<input type="text" class="search-input" placeholder="搜索产品/供应商" @click="goSearch">
				</div>
				<router-link class="to-back" to="/"></router-link>
			</header>
			<div class="kinds-con">
				<ul class="kinds">
					<li class="kinds-li" v-for="item in category" v-text="item.catname" v-bind:class='{active:item.catid==catid}' @click="categoryChange(item.catid)"></li>
				</ul>
				<div class="kinds-child" v-for="item in category">
					<div v-for="cItem in item.childs" v-if="cItem.parentid == catid">
						<p class="kind-name" v-text="cItem.catname"></p>
						<ul class="kinds-child-ul clearfix">
							<li class="kinds-child-li" v-for="sItem in cItem.son">
								<router-link :to="{name:'productList',params: {keyword:sItem.catname}}">
									<i class="kinds-img"><img v-lazy="sItem.image" alt=""></i>
									<span class="k-name ellipsis" v-text="sItem.catname"></span>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="../js/category.js"></script>