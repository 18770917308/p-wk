<template>
	<!--弹窗组件-->
	<div class="mask">
		<div class="dialogue">
			<p class="dialogue-title">{{modalTitle}}</p>
			<div class="dialogue-btn">
				<span class="dialogue-cancel" @click="cancelDialogue()">{{cancelBtn}}</span>
				<span class="dialogue-define" @click="okDialogue()">{{okBtn}}</span>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	/*弹窗遮罩*/
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.4);
		z-index: 9999;
	}
	.dialogue{
		width: 280px;
		height: 90px;
		font-size: 14px;
		color: #444;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -45px -140px;
		border-radius: 7px;
		-webkit-border-radius:7px;
		background: #fff;
		overflow: hidden;
	}
	.dialogue-title{
		margin: 0;
		line-height: 55px;
		border-bottom: 1px solid #d2d2d2;
	}
	.dialogue-btn{
		display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	}
	.dialogue-btn span{
		width: 50%;
		height: 34px;
		line-height: 35px;
		box-sizing: border-box;
	}
	.dialogue-cancel{
		border-right: 1px solid #d2d2d2;
	}
	.dialogue-btn span:active{
		background: #ddd;
	}
</style>
<script>
	export default{
		name:'dialogue',
		props:{
			modalTitle:{
				type:String,
				default:"确定？"
			},
			okBtn:{
				type:String,
				default:"确定"
			},
			cancelBtn:{
				type:String,
				default:"取消"
			}
		},
		methods:{
			cancelDialogue(){
				this.$emit('cancel');
			},
			okDialogue(){
				this.$emit('sureOpt');
			}
		}
	}
</script>