<template>
<div class="comment-item">
  <div class="info font-caption">
    <span class="index">{{ comment.index }}. </span>
    <span class="handlename">{{ comment.handlename }}</span>
  </div>
  <p class="content">{{ comment.isDeleted ? 'このコメントは削除されました' : comment.content }}</p>
  <time class="created_at font-caption">{{ convertedCreatedAt }}</time>
  <DeleteButton v-if="isOwner" @click="deleteItem" />
</div>
</template>

<script>
import DeleteButton from '@/components/atoms/DeleteButton'
import { convertToCommentDate } from '@/helpers/definition'

export default {
  name: 'CommentItem',
  components: {
    DeleteButton
  },
  props: {
    comment: Object
  },
  computed: {
    isOwner() {
      const uid = this.$store.getters['user/uid']
      const isAdmin = this.$store.getters['user/isAdmin']
      const isOwner = uid === this.comment.uid || isAdmin
      return isOwner
    },
    convertedCreatedAt() {
      return convertToCommentDate(this.comment.createdAt)
    }
  },
  methods: {
    deleteItem() {
      this.$emit('deleteItem')
    }
  }
}
</script>

<style scoped>
.comment-item > .content {
  display: inline;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, .4);
  border-radius: 16px;
  padding: 4px 8px;
}
.comment-item > .created_at {
  margin-left: 4px;
}
</style>