<template>
<div>
  {{ value }}
</div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    value: String
  }
}
</script>

<style scoped>
div {
  padding: 3px 5px;
  font-size: 11px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 500;
  border-radius: 12px;
  border: solid 1px;
  box-sizing: border-box;
}
</style>