<template>
<ul>
  <li v-for="(thread) in threads" :key="thread.id">
    {{ thread.title }}
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