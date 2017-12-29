<template>
	<div class="child-slot">
		<slot text="hello from child -slot"></slot>
	</div>
	
</template>
<script>
//插槽
//作用域插槽 一种特殊类型的插槽，用做一个（能被传递数据的）可重用模板，来代替已经渲染
// 父级为forSlot.vue
	export default {
		'/slotChild':'slotChild'
	}
</script>