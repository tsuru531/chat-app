<template>
<div>
  <Header />
  <section>
    <MainContainer>
      <h1>{{ title }}</h1>
      <router-link :to="{ path: `/thread/${threadId}/menu` }">メニュー</router-link>
      <CommentsList />
      <ResponseForm />
    </MainContainer>
  </section>
</div>
</template>

<script>
import MainContainer from '@/components/atoms/MainContainer'
import Header from '@/components/organisms/Header'
import CommentsList from '@/components/organisms/CommentsList'
import ResponseForm from '@/components/organisms/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    MainContainer,
    Header,
    CommentsList,
    ResponseForm
  },
  props: {
    title: String,
    threadId: String,
  }
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
}
</style>