<template>
<div>
  <UnderlineButton v-if="reports.length" label="通報内容を確認" @click="showModal" />
  <Modal v-if="displayedModal" @close="hideModal">
    <template v-slot:content>
      <ul>
        <li v-for="report in reports" :key="report">{{ report }}</li>
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
    reports: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      displayedModal: false,
    }
  },
  methods: {
    showModal() {
      this.displayedModal = true
    },
    hideModal() {
      this.displayedModal = false
    },
  },
}
</script>

<style scoped>

</style>
