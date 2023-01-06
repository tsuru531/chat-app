<template>
<div>
  <p data-type="body" class="comment-body">
    <slot></slot>
  </p>
  <time data-type="timestamp" class="comment-timestamp font-caption">{{ timestamp }}</time>
</div>
</template>

<script>
export default {
  name: 'CommentBody',
  props: {
    timestamp: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.comment-body {
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
.comment-timestamp {
  padding: 4px;
}
</style>
