<template>
<div>
  <h1>{{ title }}</h1>
  <router-link :to="{ path: `/thread/${threadId}/menu` }">メニュー</router-link>
</div>
</template>

<script>
export default {
  name: 'ThreadHead',
  components: {},
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$store.getters['thread/title']
    },
    threadId() {
      return this.$store.getters['thread/id']
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>