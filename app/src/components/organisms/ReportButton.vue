<template>
<UnderlineButton :label="label" @click="switchReport" />
</template>

<script>
import { mapGetters } from 'vuex'
import UnderlineButton from '@/components/atoms/UnderlineButton'

export default {
  name: 'ReportButton',
  components: {
    UnderlineButton,
  },
  props: {
    reports: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('user', [
      'uid',
    ]),
    isReported() {
      if (!this.reports) return false
      return this.reports.includes(this.uid)
    },
    label() {
      return this.isReported ? "通報を取り消す" : "通報"
    },
  },
  methods: {
    async switchReport() {
      if (!this.isReported) {
        await this.$store.dispatch('thread/comments/createReport', this.index)
      } else {
        await this.$store.dispatch('thread/comments/deleteReport', this.index)
      }
    },
  },
}
</script>

<style scoped>

</style>
