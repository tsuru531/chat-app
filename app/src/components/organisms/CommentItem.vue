<template>
<div class="comment-item wrapper">
  <div class="comment-item info font-caption">
    <span class="comment-item index">{{ comment.index }}. </span>
    <span class="comment-item handlename">{{ comment.handlename }}</span>
  </div>
  <div class="comment-item body">
    <p class="comment-item content" ref="content">{{ comment.isDeleted ? deletedText : comment.content }}</p>
    <time class="comment-item created-at font-caption">{{ convertedCreatedAt }}</time>
    <ReplyButton @click="reply" />
    <DeleteButton v-if="isOwner" @click="deleteItem" />
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import ReplyButton from '@/components/atoms/ReplyButton'
import DeleteButton from '@/components/atoms/DeleteButton'
import Anchor from '@/components/atoms/Anchor'
import { convertToCommentDate } from '@/helpers/definition'

export default {
  name: 'CommentItem',
  components: {
    ReplyButton,
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
    },
    reply() {
      this.$emit('reply', this.comment.index)
    }
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
        const comment = this.$store.getters['thread/comment'](index)
        const AnchorComponent = Vue.extend(Anchor)
        const instance = new AnchorComponent({ propsData: { index: comment.index }})
        instance.$mount()
        item.replaceWith(instance.$el)
      })
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