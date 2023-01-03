<template>
<div class="comment_item-wrapper">
<<<<<<< HEAD
  <CommentHeader
    :index="comment.index"
    :handlename="comment.handlename"
    :isReported="isReported"
    :isDeleted="isDeleted"
  />
  <div class="comment-item body">
    <CommentBody :timestamp="createdAt">
      {{ comment.deletedAt ? deletedText : body }}
    </CommentBody>
    <CommentButtons
      v-if="!comment.deletedAt"
      :isLike="isLike"
      :likesCount="likesCount"
      :showDelete="canDelete"
    />
=======
  <div class="comment_item-info font-caption">
    <span>
      <span class="comment-item index">{{ index }}. </span>
      <span class="comment-item handlename">{{ handlename }}</span>
    </span>
    <ReportButton v-if="!comment.deletedAt" :isReported="isReported" @click="switchReport" />
  </div>
  <div class="comment-item body">
    <p class="comment-item content" ref="content">{{ comment.deletedAt ? deletedText : body }}</p>
    <time class="comment-item created-at font-caption">{{ createdAt }}</time>
    <div v-if="!comment.deletedAt">
      <ReplyButton @click="reply" />
      <LikeButton :isLike="isLike" @click="switchLike" />
      <DeleteButton v-if="canDeleted" @click="deleteItem" />
    </div>
>>>>>>> parent of 29e7ffb (wip)
  </div>
</div>
</template>

<script>
<<<<<<< HEAD
import CommentHeader from '@/components/molecules/CommentHeader'
import CommentBody from '@/components/molecules/CommentBody'
import CommentButtons from '@/components/molecules/CommentButtons'
=======
import Vue from 'vue'
import ReportButton from '@/components/atoms/ReportButton'
import ReplyButton from '@/components/atoms/ReplyButton'
import LikeButton from '@/components/atoms/LikeButton'
import DeleteButton from '@/components/atoms/DeleteButton'
import Anchor from '@/components/molecules/Anchor'
>>>>>>> parent of 29e7ffb (wip)
import { convertTimestamp } from '@/modules'

export default {
  name: 'CommentItem',
  components: {
<<<<<<< HEAD
    CommentHeader,
    CommentBody,
    CommentButtons,
=======
    ReportButton,
    ReplyButton,
    LikeButton,
    DeleteButton
>>>>>>> parent of 29e7ffb (wip)
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
    isReported() {
      if (!this.comment.reports) return false
      return this.comment.reports.includes(this.uid)
    },
    isLike() {
      if (!this.comment.likes) return false
      return this.comment.likes.includes(this.uid)
    },
<<<<<<< HEAD
    likesCount() {
      if (!this.comment.likes) return 0
      return this.comment.likes.length
    },
    isDeleted() {
      return this.comment.deletedAt ? true : false
    },
    canDelete() {
=======
    canDeleted() {
>>>>>>> parent of 29e7ffb (wip)
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
.comment-item.content {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, .4);
  border-radius: 8px;
  margin: 0;
  padding: 4px 8px;
  white-space: pre-wrap;
  min-width: 112px;
  min-height: 34px;
}
.comment-item.body {
  display: flex;
  align-items: flex-end;
}
<<<<<<< HEAD
=======
.comment-item.created-at {
  padding: 4px;
}
.comment_item-info {
  display: flex;
  gap: 4px;
}
>>>>>>> parent of 29e7ffb (wip)
</style>
