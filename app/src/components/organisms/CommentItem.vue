<template>
<div class="comment_item-wrapper">
  <CommentHeader
    :index="comment.index"
    :handlename="comment.handlename"
    :isReported="isReported"
    :isDeleted="isDeleted"
    @report="switchReport"
  />
  <div class="comment-item body">
    <CommentBody :timestamp="createdAt">
      <template v-for="item in commentBodys">
        <template v-if="comment.deletedAt">{{ deletedText }}</template>
        <template v-else-if="item.type == 'text'">{{ item.body }}</template>
        <Anchor
          v-else-if="item.type == 'anchor'"
          :key="item.key"
          :index="Number(item.body)"
          text=""
        />
      </template>
    </CommentBody>
    <CommentButtons
      v-if="!comment.deletedAt"
      :isLike="isLike"
      :likesCount="likesCount"
      :showDelete="canDelete"
      @reply="reply"
      @like="switchLike"
      @delete="deleteItem"
    />
  </div>
</div>
</template>

<script>
import CommentHeader from '@/components/molecules/CommentHeader'
import CommentBody from '@/components/molecules/CommentBody'
import CommentButtons from '@/components/molecules/CommentButtons'
import Anchor from '@/components/molecules/Anchor'
import { convertTimestamp, convertComment } from '@/modules'

export default {
  name: 'CommentItem',
  components: {
    CommentHeader,
    CommentBody,
    CommentButtons,
    Anchor,
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
    body: {
      type: String,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deletedText: 'このコメントは削除されました',
    }
  },
  computed: {
    uid() {
      return this.$store.getters['user/uid']
    },
    threadId() {
      return this.$store.getters['thread/id']
    },
    createdAt() {
      return convertTimestamp(this.comment.createdAt)
    },
    commentBodys() {
      return convertComment(this.comment.body)
    },
    isReported() {
      if (!this.comment.reports) return false
      return this.comment.reports.includes(this.uid)
    },
    isLike() {
      if (!this.comment.likes) return false
      return this.comment.likes.includes(this.uid)
    },
    likesCount() {
      if (!this.comment.likes) return 0
      return this.comment.likes.length
    },
    isDeleted() {
      return this.comment.deletedAt ? true : false
    },
    canDelete() {
      const uid = this.$store.getters['user/uid']
      const isOwner = uid === this.comment.uid && uid !== ''
      const isAdmin = this.$store.getters['user/isAdmin']
      return isOwner || isAdmin
    },
  },
  methods: {
    async switchReport() {
      if (!this.isReported) {
        await this.$store.dispatch('thread/comments/createReport', this.comment.index)
      } else {
        await this.$store.dispatch('thread/comments/deleteReport', this.comment.index)
      }
    },
    deleteItem() {
      this.$emit('deleteItem')
    },
    reply() {
      this.$emit('reply', this.comment.index)
    },
    async switchLike() {
      if (!this.isLike) {
        await this.$store.dispatch('thread/comments/addLike', this.comment.index)
      } else {
        await this.$store.dispatch('thread/comments/removeLike', this.comment.index)
      }
    },
  },
}
</script>

<style scoped>
.comment_item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.comment-item.body {
  display: flex;
  align-items: flex-end;
}
</style>
