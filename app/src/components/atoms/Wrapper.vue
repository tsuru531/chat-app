<template>
<div>
  <slot />
</div>
</template>

<script>
export default {
  name: 'Wrapper',
}
</script>

<style scoped>
div {
  border-radius: 8px;
  border: 1px solid #00000050;
}
</style>
