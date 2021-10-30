<template>
<h2>
  {{ value }}
</h2>
</template>

<script>
export default {
  name: 'CardTitle',
  props: {
    value: String
  }
}
</script>

<style scoped>
h2 {
  color: #232F34;
  margin: 0;
  font-size: 17px;
  font-weight: bold;
}
</style>