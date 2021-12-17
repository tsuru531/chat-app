<template>
<span class="anchor">
  >>{{ this.index }}
</span>
</template>

<script>
export default {
  name: 'Anchor',
  props: {
    index: Number
  }
}
</script>

<style scoped>
.anchor {
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 2px;
}
</style>