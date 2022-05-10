<template>
<div>
  <h1>{{ title }}</h1>
  <CommentsCounter :count="commentsCount" />
  <button v-if="isHaveThreadPermission" @click="deleteThread">スレッドを削除する</button>
</div>
</template>

<script>
import CommentsCounter from '@/components/atoms/CommentsCounter'

export default {
  name: 'ThreadHead',
  components: {
    CommentsCounter
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$store.getters['thread/title']
    },
    threadId() {
      return this.$store.getters['thread/id']
    },
    isHaveThreadPermission() {
      return this.$store.getters['user/isHaveThreadPermission']
    },
    commentsCount() {
      const comments = this.$store.getters['thread/comments']
      return comments.length
    }
  },
  methods: {
    deleteThread() {
      this.$store.dispatch('thread/delete', this.threadId)
    }
  },
}
</script>

<style scoped>

</style>
