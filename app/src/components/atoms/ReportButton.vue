<template>
<button type="button" @click="click">{{ isReported ? "通報を取り消す" : "通報" }}</button>
</template>

<script>
export default {
  name: 'ReportButton',
  props: {
    isReported: Boolean,
  },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
</style>
