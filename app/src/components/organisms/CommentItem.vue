<template>
<div class="comment_item-wrapper">
  <CommentHeader
    :index="index"
    :handlename="handlename"
    :isReported="isReported"
    :isDeleted="isDeleted"
  />
  <div class="comment-item body">
    <p class="comment-item content" ref="content">{{ comment.deletedAt ? deletedText : body }}</p>
    <time class="comment-item created-at font-caption">{{ createdAt }}</time>
    <div v-if="!comment.deletedAt">
      <ReplyButton @click="reply" />
      <LikeButton :isLike="isLike" @click="switchLike" />
      <DeleteButton v-if="canDelete" @click="deleteItem" />
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import ReplyButton from '@/components/atoms/ReplyButton'
import LikeButton from '@/components/atoms/LikeButton'
import DeleteButton from '@/components/atoms/DeleteButton'
import CommentHeader from '@/components/molecules/CommentHeader'
import Anchor from '@/components/molecules/Anchor'
import { convertTimestamp } from '@/modules'

export default {
  name: 'CommentItem',
  components: {
    ReplyButton,
    LikeButton,
    DeleteButton,
    CommentHeader,
  },
  props: {
    comment: {
      type: Object,
      required: true,
      validator(value) {
        const valueKeys = Object.keys(value);
        let isIncludeAllNeedKey = true;
        ['index', ].forEach((needKey)=>{
          isIncludeAllNeedKey = isIncludeAllNeedKey && valueKeys.includes(needKey)
        });
        return isIncludeAllNeedKey
      },
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
  mounted() {
    const anchorRegexp = /&gt;&gt;(\d+)/g
    const ref = this.$refs.content
    if (ref.innerHTML.match(anchorRegexp)) {
      const replaceHTML = ref.innerHTML.replace(anchorRegexp, '<span>$1</span>')
      ref.innerHTML = replaceHTML
      const nodeList = ref.querySelectorAll('span')
      nodeList.forEach(item => {
        const anchorNumber = Number(item.textContent)
        const comments = this.$store.getters['thread/comments/array']
        const anchorComment = comments[anchorNumber - 1]
        const text = anchorComment.body
        const AnchorComponent = Vue.extend(Anchor)
        const instance = new AnchorComponent({ propsData: { index: anchorNumber, text }})
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
.comment-item.body {
  display: flex;
  align-items: flex-end;
}
.comment_item-info {
  display: flex;
  gap: 4px;
}
</style>
