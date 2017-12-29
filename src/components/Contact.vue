<template id="contact">
    <div>
        <h1>Contact</h1>
        <p>This is the tutorial about Contact.</p>
        <slot>没有分发内容时才会显示</slot>
    </div>
</template>
<script>
export default {
  '/contact': 'contact'
}
</script>