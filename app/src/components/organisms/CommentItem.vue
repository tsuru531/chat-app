<template>
<div class="comment_item-wrapper">
  <div class="comment_item-info font-caption">
    <span>
      <span class="comment-item index">{{ comment.index }}. </span>
      <span class="comment-item handlename">{{ comment.handlename }}</span>
    </span>
    <ReportButton v-if="!comment.isDeleted" :isReported="isReported" @click="switchReport" />
  </div>
  <div class="comment-item body">
    <p class="comment-item content" ref="content">{{ comment.isDeleted ? deletedText : comment.content }}</p>
    <time class="comment-item created-at font-caption">{{ convertedCreatedAt }}</time>
    <div v-if="!comment.isDeleted">
      <ReplyButton @click="reply" />
      <LikeButton :isLike="isLike" @click="switchLike" />
      <DeleteButton v-if="isDisplayedDelete" @click="deleteItem" />
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import ReportButton from '@/components/atoms/ReportButton'
import ReplyButton from '@/components/atoms/ReplyButton'
import LikeButton from '@/components/atoms/LikeButton'
import DeleteButton from '@/components/atoms/DeleteButton'
import Anchor from '@/components/molecules/Anchor'
import { convertToCommentDate } from '@/helpers/definition'

export default {
  name: 'CommentItem',
  components: {
    ReportButton,
    ReplyButton,
    LikeButton,
    DeleteButton
  },
  props: {
    comment: Object
  },
  data() {
    return {
      deletedText: 'このコメントは削除されました',
    }
  },
  computed: {
    isReported() {
      return this.$store.getters['thread/commentIsReported'](this.comment.id)
    },
    threadId() {
      return this.$store.getters['thread/id']
    },
    userId() {
      const userId = this.$store.getters['user/uid']
      return userId
    },
    isDisplayedDelete() {
      const uid = this.$store.getters['user/uid']
      const isOwner = uid === this.comment.uid && uid !== ''
      const isAdmin = this.$store.getters['user/isAdmin']
      return isOwner || isAdmin
    },
    convertedCreatedAt() {
      return convertToCommentDate(this.comment.createdAt)
    },
    isLike() {
      const isExist = Boolean(this.$store.getters['thread/likes/findById'](`${this.userId}${this.comment.id}`))
      return isExist
    },
  },
  methods: {
    switchReport() {
      this.$store.dispatch('thread/switchCommentReport', this.comment.id)
    },
    deleteItem() {
      this.$emit('deleteItem')
    },
    reply() {
      this.$emit('reply', this.comment.index)
    },
    switchLike() {
      this.$store.dispatch('thread/likes/switch', {
        userId: this.userId,
        commentId: this.comment.id,
        threadId: this.threadId
      })
    },
  },
  mounted() {
    const anchorRegexp = /&gt;&gt;(\d+)/g
    const ref = this.$refs.content
    if (ref.innerHTML.match(anchorRegexp)) {
      const replaceHTML = ref.innerHTML.replace(anchorRegexp, '<span>$1</span>')
      ref.innerHTML = replaceHTML
      const nodeList = ref.querySelectorAll('span')
      nodeList.forEach(item => {
        const index = Number(item.textContent)
        const anchor = this.$store.getters['thread/comment'](index)
        const text = anchor.content
        const AnchorComponent = Vue.extend(Anchor)
        const instance = new AnchorComponent({ propsData: { index, text }})
        instance.$mount()
        item.replaceWith(instance.$el)
      })
    }
  }
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
.comment_item-info {
  display: flex;
  gap: 4px;
}
</style>
