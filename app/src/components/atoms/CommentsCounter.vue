<template>
<div class="comments-counter_wrapper">
  <svg class="comments-counter_icon" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
  <span class="comments-counter">{{ count }}</span>
</div>
</template>

<script>
export default {
  name: 'CommentsCounter',
  components: {},
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.comments-counter {
  font-size: 12px;
  color: rgba(0, 0, 0);
}
.comments-counter::after {
  content: 'コメント'
}
.comments-counter_wrapper {
  display: inline;
  opacity: .5;
}
.comments-counter_icon {
  vertical-align: bottom;
}
</style>