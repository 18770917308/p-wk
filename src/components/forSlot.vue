<template>
	<div class="forSlot">
		<slot-child>
			<template slot-scope="props">
				<p>hello from parents</p>
				<p>{{props.text}}</p>
			</template>
		</slot-child>	
		<div>
			<h5>输入了{{count}}个文字</h5>
			<textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
		</div>
		<button type="button" @click="isShow=!isShow">toggle show</button>
		<transition name="out-in">
			<h2 v-show="isShow">TOGGLE</h2>
		</transition>
		<transition-group tag="ul" name="slide">
			<li v-for="item in arrObj" :key="item.id">{{item.text}}</li>
		</transition-group>
		<anchored-heading :level="1">GG</anchored-heading>
		<hr>
		<div>
			<button-check :result="result" @has-changed="hasChanged"></button-check>
			<input type="button" value="change" @click="change">
		</div>
	</div>
</template>
<script>
//父级中 template和slot-scope必须存在
import slotChild from '../components/slotChild'
	export default{
		'/forSlot':'forSlot',
		components: {
			slotChild,
			'anchored-heading':{
				render: function(createElement){
					return createElement('h'+this.level,this.$slots.default)
				},
				props: {
					level: {
						type:Number,//props验证 level的type为number
						required: true//props验证 level不可省略
					}
				}
			},
			'button-check':{
				template:"<div @click='change'>{{myResult?'open':'closed'}}</div>",
				props:['result'],
				data: function(){
					return {
						myResult: this.result//创建result的副本
					}
				},
				watch: {
					result(val){//监听外部对props属性result的变更
						this.myResult = val;
					},
					myResult: function(val,oldVal){//监听myResult
						this.$emit('has-changed',val)//组件内的myResult变更后向父级发送通知
													 //$emit 子组件将数据传递给外部组件
					}
				},
				methods: {
					change(){
						this.myResult=!this.myResult;
					}
				}
			}
		},
		data: function(){
			return {
				content:'',
				count:0,
				isShow:true,
				arrObj:[
					{text:"123",id:1},
					{text:"345",id:2},
					{text:"456",id:3},
					{text:"123",id:4},
					{text:"345",id:5},
					{text:"456",id:6}
				],
				result:true
			}
			
		},
		watch: {//
			content: 
				function(val,oldVal){
					var len = val.length;
					this.count = len;
				}
			
		},
		methods: {
			change(){
				this.result = !this.result;
			},
			hasChanged(val){
				this.result = val;
			}
			
			
		},
		/*beforeCreate: function(){
			alert("before create");
		},
		created: function(){
			
		},
		
		beforeMount: function(){
			alert("before mount");
		}*/
	}
</script>