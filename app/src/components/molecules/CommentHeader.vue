<template>
<div class="comment_item-info font-caption">
  <span>
    <span data-label="index">{{ index }}</span>
    <span>. </span>
    <span data-label="handlename">{{ handlename }}</span>
  </span>
  <ReportButton v-if="!isDeleted" :isReported="isReported" @click="report" />
</div>
</template>

<script>
import ReportButton from '@/components/atoms/ReportButton'

export default {
  name: 'CommentHeader',
  components: {
    ReportButton,
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
    isReported: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    report() {
      this.$emit('report')
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
