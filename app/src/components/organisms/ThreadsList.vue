<template>
<ul>
  <li v-for="thread in threads" :key="thread.id">
    <router-link :to="{ path: `/thread/${thread.id}` }">
      <ThreadCard :thread="thread" />
    </router-link>
  </li>
</ul>
</template>

<script>
import ThreadCard from '@/components/organisms/ThreadCard'

export default {
  name: 'ThreadsList',
  components: {
    ThreadCard
  },
  computed: {
    threads() {
      return this.$store.getters['threads/all']
    }
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
ul {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  margin: 0;
  width: min(100%, 760px);
}
</style>