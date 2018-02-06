<template>
	<div class="bdsharebuttonbox bdshare-button-style0-32">
		<a href="javascipt:void(0)" class="bds_weixin" data-cmd="weixin" title="微信"></a>
		<a href="javascipt:void(0)" class="bds_sqq" data-cmd="sqq" title="QQ好友"></a>
		<a href="javascipt:void(0)" class="bds_qzone" data-cmd="qzone" title="QQ空间"></a>
		<a href="javascipt:void(0)" class="bds_tsina" data-cmd="tsina" title="新浪"></a>
		<a href="javascipt:void(0)" class="bds_more" data-cmd="more" title="更多"></a>
	</div>
</template>
<style type="text/css">
.bdsharebuttonbox{
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		max-width: 640px;
		min-width: 320px;
		background: #fff;
	    z-index: -1;
	    text-align: center;
	    visibility: hidden;
}
.bdsharebuttonbox a{
	float: none!important;
	display: inline-block;
	margin: 0 4.5%!important;
}
@media screen and (max-width: 390px){
	.bdsharebuttonbox a{
		margin: 0 3.3%!important;
	}
}
</style>
<script>
	export default{
		name:'share'
	}
</script>