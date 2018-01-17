<template>
	<div>
		<div class="rec-tips-wrap">
			<ul class="rec-tips clearfix">
				<li class="line-left"></li>
				<li class="tips-con">{{msg}}</li>
				<li class="line-right"></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		'/isEnd':'isEnd',
		props:{
			msg:{
				type:String,
				default:"没有更多了"
			}
		}
	}
</script>
<style type="text/css">
	.rec-tips-wrap{
		padding: 10px 60px;
		box-sizing: border-box;
	}
	.rec-tips li{
		float: left;
	}
	.tips-con{
		width: 26%;
		color: #ccc;
		font-size: 12px;
		text-align: center;
		padding:0 5px;
		box-sizing: border-box;
	}
	.line-left,.line-right{
		width: 37%;
		border-bottom:1px solid #ccc;
		position: relative;
		top: 5px;
	}
	@media screen and (max-width: 436px){
		.rec-con-main{
			margin: 10px 0 0 0;
		}
		.tips-con{
			width: 44%;
			color: #ccc;
			font-size: 12px;
			text-align: center;
			padding:0 5px;
			box-sizing: border-box;
		}
		.line-left,.line-right{
			width: 28%;
			border-bottom:1px solid #ccc;
			position: relative;
			top: 5px;
		}
	}
	</style>