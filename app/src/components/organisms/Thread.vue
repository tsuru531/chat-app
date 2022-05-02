<template>
<section class="thread">
  <header>
    <ThreadHead />
  </header>
  <main>
    <CommentsList @reply="reply" />
  </main>
</section>
</template>

<script>
import ThreadHead from '@/components/organisms/ThreadHead'
import CommentsList from '@/components/organisms/CommentsList'

export default {
  name: 'Thread',
  components: {
    ThreadHead,
    CommentsList,
  },
  methods: {
    reply(index) {
      this.$emit('reply', index)
    },
  },
}
</script>

<style scoped>
.thread {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
}
</style>
