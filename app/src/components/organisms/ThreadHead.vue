<template>
<div>
  <router-link :to="{ path: `/thread/${threadId}/menu` }">メニュー</router-link>
  <h1>{{ title }}</h1>
  <CommentsCounter :count="commentsCount" />
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
    commentsCount() {
      const comments = this.$store.getters['thread/comments']
      return comments.length
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>