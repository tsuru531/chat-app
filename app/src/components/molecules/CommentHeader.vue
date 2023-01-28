<template>
<div class="comment_item-info font-caption">
  <span>
    <span data-label="index">{{ index }}</span>
    <span>. </span>
    <span data-label="handlename">{{ handlename }}</span>
  </span>
  <template v-if="!isDeleted">
    <ReportButton v-if="!isHideReport" :isReported="isReported" @click="report" />
    <ConfirmReportButton v-if="isShowConfirmReport" @click="confirm" />
  </template>
</div>
</template>

<script>
import ReportButton from '@/components/molecules/ReportButton'
import ConfirmReportButton from '@/components/molecules/ConfirmReportButton'

export default {
  name: 'CommentHeader',
  components: {
    ReportButton,
    ConfirmReportButton,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    handlename: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    reports:{
      type: Array,
      required: false,
      default() {
        return []
      },
    },
    isReported: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    isHideReport() {
      return this.role === 'admin'
    },
    isShowConfirmReport() {
      return this.isHideReport && Boolean(this.reports.length)
    },
  },
  methods: {
    report() {
      this.$emit('report')
    },
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>
.comment_item-info {
  display: flex;
  gap: 4px;
}
</style>
