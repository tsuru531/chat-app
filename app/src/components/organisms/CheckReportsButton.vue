<template>
<div>
  <UnderlineButton v-if="isReported" label="通報内容を確認" @click="showModal" />
  <Modal v-if="displayedModal" @close="hideModal">
    <template v-slot:content>
      <ul>
        <li v-for="report in reports" :key="report.uid">
          <p>{{ report.uid }}</p>
          <p>{{ report.body }}</p>
        </li>
      </ul>
    </template>
  </Modal>
</div>
</template>

<script>
import UnderlineButton from '@/components/atoms/UnderlineButton'
import Modal from '@/components/atoms/Modal'

export default {
  name: 'CheckReportsButton',
  components: {
    UnderlineButton,
    Modal,
  },
  props: {
    isReported: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reports: [],
      displayedModal: false,
    }
  },
  methods: {
    async showModal() {
      this.displayedModal = true
      this.reports = await this.$store.dispatch('thread/comments/getReports', this.index)
    },
    hideModal() {
      this.displayedModal = false
    },
  },
}
</script>

<style scoped>

</style>
