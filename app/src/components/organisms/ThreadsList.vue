<template>
<ul>
  <li v-for="{ id, title } in threads" :key="id">
    <router-link :to="{ path: `/thread/${id}` }">
      <ThreadCard :title="title" />
    </router-link>
  </li>
</ul>
</template>

<script>
import ThreadCard from '@/components/molecules/ThreadCard'

export default {
  name: 'ThreadsList',
  components: {
    ThreadCard
  },
  computed: {
    threads() {
      return this.$store.getters['thread/threads']
    }
  },
  created() {
    return this.$store.dispatch('thread/watchThreads')
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  margin: 0;
}
</style>