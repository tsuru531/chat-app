<template>
<ul>
  <li v-for="(comment) in comments" :key="comment.id">
    <div>{{ comment.index }}</div>
    <div>{{ comment.handlename }}</div>
    <p>{{ comment.content }}</p>
    <time>{{ comment.created_at }}</time>
  </li>
</ul>
</template>

<script>
export default {
  name: 'CommentsList',
  computed: {
    comments() {
      return this.$store.getters['thread/comments']
    }
  }
}
</script>