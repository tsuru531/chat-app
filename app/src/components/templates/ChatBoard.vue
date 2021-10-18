<template>
<div>
  <Header />
  <h1>{{ title }}</h1>
  <CommentsList />
  <ResponseForm />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import CommentsList from '@/components/organisms/CommentsList'
import ResponseForm from '@/components/organisms/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    Header,
    CommentsList,
    ResponseForm
  },
  props: {
    title: String
  }
}
</script>