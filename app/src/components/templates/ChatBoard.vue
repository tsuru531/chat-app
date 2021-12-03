<template>
<div>
  <Header />
  <div class="wrapper">
    <section class="width-main">
      <ThreadHead />
      <CommentsList />
      <ResponseForm />
    </section>
  </div>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import ThreadHead from '@/components/organisms/ThreadHead'
import CommentsList from '@/components/organisms/CommentsList'
import ResponseForm from '@/components/organisms/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    Header,
    ThreadHead,
    CommentsList,
    ResponseForm
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>