<template>
<div>
  <Header />
  <h1>{{ title }}</h1>
  <CommentsList />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import CommentsList from '@/components/organisms/CommentsList'

export default {
  name: 'ChatBoard',
  components: {
    Header,
    CommentsList
  },
  props: {
    title: String
  }
}
</script>