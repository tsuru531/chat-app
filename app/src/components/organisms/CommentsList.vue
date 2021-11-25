<template>
<div>
  <ul>
    <li v-for="(comment) in comments" :key="comment.id">
      <CommentItem :comment="comment" @deleteItem="displayModal(comment)" />
    </li>
  </ul>
  <ModalDialog v-if="modal.isDisplayed" @close="hideModal">
    <template v-slot:content>
      <p>このコメントを削除してもよろしいですか？</p>
      <p>{{ modal.content }}</p>
    </template>
    <template v-slot:footer>
      <div class="button-wrapper">
        <Button label="いいえ" @click="hideModal" />
        <Button label="はい" color="danger" @click="deleteComment" />
      </div>
    </template>
  </ModalDialog>
</div>
</template>

<script>
import Button from '@/components/atoms/Button'
import ModalDialog from '@/components/molecules/ModalDialog'
import CommentItem from '@/components/organisms/CommentItem'

export default {
  name: 'CommentsList',
  components: {
    Button,
    CommentItem,
    ModalDialog
  },
  data() {
    return {
      modal: {
        isDisplayed: false,
        comment_id: '',
        content: ''
      }
    }
  },
  computed: {
    comments() {
      return this.$store.getters['thread/comments']
    }
  },
  methods: {
    displayModal(comment) {
      const { id, content } = comment
      this.modal.isDisplayed = true
      this.modal.comment_id = id
      this.modal.content = content
    },
    hideModal() {
      this.modal.isDisplayed = false
      this.modal.comment_id = ''
      this.modal.content = ''
    },
    deleteComment() {
      this.$store.dispatch('thread/deleteComment', this.modal.comment_id)
      this.hideModal()
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  margin: 0;
}
li {
  list-style: none;
}
.button-wrapper {
  display: flex;
  gap: 8px;
}
</style>