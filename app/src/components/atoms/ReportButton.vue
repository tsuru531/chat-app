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
button {
  background-color: transparent;
  border: 0;
  border-bottom: solid 1px rgba(0, 0, 0, 1);
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
