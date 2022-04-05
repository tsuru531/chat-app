<template>
<div>
  <Header />
  <ThreadsList />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import ThreadsList from '@/components/organisms/ThreadsList'

export default {
  name: 'Home',
  components: {
    Header,
    ThreadsList
  },
  mounted() {
    return this.$store.dispatch('threads/getPopularity')
  },
}
</script>
