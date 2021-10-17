<template>
<ul>
  <li v-for="(thread) in threads" :key="thread.id">
    <router-link :to="{ path: `/thread/${thread.id}` }">{{ thread.title }}</router-link>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ThreadsList',
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