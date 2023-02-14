<template>
<div class="comment_item-info font-caption">
  <span>
    <span data-label="index">{{ index }}</span>
    <span>. </span>
    <span data-label="handlename">{{ handlename }}</span>
  </span>
  <template v-if="!isDeleted">
    <ReportButton v-if="!isAdmim" :reports="reports" :index="index" />
    <CheckReportsButton v-if="isAdmim" :isReported="Boolean(reports.length)" :index="index" />
  </template>
</div>
</template>

<script>
import ReportButton from '@/components/organisms/ReportButton'
import CheckReportsButton from '@/components/organisms/CheckReportsButton'

export default {
  name: 'CommentHeader',
  components: {
    ReportButton,
    CheckReportsButton,
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
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    isAdmim() {
      return this.role === 'admin'
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
