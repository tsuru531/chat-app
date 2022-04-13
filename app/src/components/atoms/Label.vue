<template>
<label class="label">
  <slot></slot>
</label>
</template>

<script>
export default {
  name: 'Label',
}
</script>

<style scoped>
.label {
  display: block;
}
</style>
