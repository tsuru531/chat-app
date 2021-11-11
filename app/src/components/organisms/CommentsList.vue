<template>
<ul>
  <li v-for="(comment) in comments" :key="comment.id">
    <CommentItem :comment="comment" />
  </li>
</ul>
</template>

<script>
import CommentItem from '@/components/molecules/CommentItem'

export default {
  name: 'CommentsList',
  components: {
    CommentItem
  },
  computed: {
    comments() {
      return this.$store.getters['thread/comments']
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  margin: 0;
}
li {
  list-style: none;
}
</style>