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
      return this.$store.getters['thread/commentsCount']
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>