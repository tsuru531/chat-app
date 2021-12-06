<template>
<div class="comment-item wrapper">
  <div class="comment-item info font-caption">
    <span class="comment-item index">{{ comment.index }}. </span>
    <span class="comment-item handlename">{{ comment.handlename }}</span>
  </div>
  <div class="comment-item body">
    <p class="comment-item content">{{ comment.isDeleted ? 'このコメントは削除されました' : comment.content }}</p>
    <time class="comment-item created-at font-caption">{{ convertedCreatedAt }}</time>
    <DeleteButton v-if="isOwner" @click="deleteItem" />
  </div>
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
.comment-item.content {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, .4);
  border-radius: 16px;
  margin: 0;
  padding: 4px 8px;
  white-space: pre-wrap;
}
.comment-item.body {
  display: flex;
  align-items: flex-end;
}
.comment-item.created-at {
  padding: 4px;
}
</style>