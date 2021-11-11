<template>
<div class="comment-item">
  <div class="info font-caption">
    <span class="index">{{ comment.index }}. </span>
    <span class="handlename">{{ comment.handlename }}</span>
  </div>
  <p class="content">{{ comment.content }}</p>
  <time class="created_at font-caption">{{ comment.created_at }}</time>
</div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: Object
  }
}
</script>

<style scoped>
.comment-item > .content {
  display: inline;
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, .4);
  border-radius: 16px;
  padding: 4px 8px;
}
.comment-item > .created_at {
  margin-left: 4px;
}
</style>