<template>
<div>
  <UnderlineButton v-if="!isReported" ref="open" label="通報" @click="showModal" />
  <UnderlineButton v-else-if="isReported" ref="cancel" label="通報を取り消す" @click="deleteReport" />
  <Modal v-if="modal.isDisplayed" @close="hideModal">
    <template v-slot:content>
      <Button label="閉じる" @click="hideModal" />
      <Button ref="send" label="送信" color="primary" @click="createReport" />
    </template>
  </Modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnderlineButton from '@/components/atoms/UnderlineButton'
import Modal from '@/components/atoms/Modal'
import Button from '@/components/atoms/Button'

export default {
  name: 'ReportButton',
  components: {
    UnderlineButton,
    Modal,
    Button,
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
  data() {
    return {
      modal: {
        isDisplayed: false,
      },
    }
  },
  computed: {
    ...mapGetters('user', [
      'uid',
    ]),
    isReported() {
      if (!this.reports) return false
      return this.reports.includes(this.uid)
    },
  },
  methods: {
    showModal() {
      this.modal.isDisplayed = true
    },
    hideModal() {
      this.modal.isDisplayed = false
    },
    async createReport() {
      await this.$store.dispatch('thread/comments/createReport', this.index)
      this.hideModal()
    },
    async deleteReport() {
      await this.$store.dispatch('thread/comments/deleteReport', this.index)
    },
  },
}
</script>

<style scoped>

</style>
