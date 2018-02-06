<template>
	<!--弹窗组件-->
	<div class="mask" @click="cancelDialogue()">
		<div class="dialogue" @click.stop=''>
			<p class="dialogue-title">{{modalTitle}}</p>
			<div class="dialogue-btn" v-if="diaType=='normal'">
				<span class="dialogue-cancel" @click="cancelDialogue()">{{cancelBtn}}</span>
				<span class="dialogue-define" @click="okDialogue()">{{okBtn}}</span>
			</div>
			<div class="dialogue-btn" v-if="diaType=='alert'"  @click="okDialogue()"><span>确认</span></div>
		</div>
	</div>
</template>
<style type="text/css" scoped>
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
	    text-align: center;
	    line-height: 35px;
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
			},
			diaType:{
				type:String,
				default:'normal'//normal:为带‘确认’和‘取消’按钮 alert:为只有一个确定按钮，提示作用，点击则隐藏弹窗
								//该字段可自定义多种 视情况而定
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