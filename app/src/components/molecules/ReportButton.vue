<template>
<UnderlineButton :label="label" @click="click" />
</template>

<script>
import UnderlineButton from '@/components/atoms/UnderlineButton';

export default {
  name: 'ReportButton',
  components: {
    UnderlineButton,
  },
  props: {
    isReported: Boolean,
  },
  computed: {
    label() {
      return this.isReported ? "通報を取り消す" : "通報"
    },
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
