<template>
<div>
  <ul>
    <li v-for="(comment) in comments" :key="comment.index">
      <CommentItem
        :index="comment.index"
        :handlename="comment.handlename"
        :body="comment.body"
        :comment="comment"
        @deleteItem="displayModal(comment)"
        @reply="reply"
      />
    </li>
  </ul>
  <ModalDialog v-if="modal.isDisplayed" @close="hideModal">
    <template v-slot:content>
      <p>{{ deleteMessage }}</p>
      <p>{{ modal.body }}</p>
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
      deleteMessage: 'このコメントを削除してもよろしいですか？',
      modal: {
        isDisplayed: false,
        commentId: '',
        body: ''
      },
    }
  },
  computed: {
    comments() {
      return this.$store.getters['thread/comments/array']
    }
  },
  methods: {
    displayModal(comment) {
      this.modal.isDisplayed = true
      this.modal.commentId = comment.index
      this.modal.body = comment.body
    },
    hideModal() {
      this.modal.isDisplayed = false
      this.modal.commentId = ''
      this.modal.body = ''
    },
    deleteComment() {
      this.$store.dispatch('thread/comments/delete', this.modal.commentId)
      this.hideModal()
    },
    reply(index) {
      this.$emit('reply', index)
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
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