<template>
<button type="button" @click="emitClick">
  通報内容を確認
</button>
</template>

<script>
export default {
  name: 'ConfirmReportButton',
  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>

</style>
