<template>
<div>
  <button v-if="isHaveThreadPermission" @click="deleteThread">スレッドを削除する</button>
</div>
</template>

<script>
export default {
  name: 'ThreadMenu',
  computed: {
    isHaveThreadPermission() {
      return this.$store.getters['user/isHaveThreadPermission']
    },
    threadId() {
      return this.$store.getters['thread/id']
    }
  },
  methods: {
    deleteThread() {
      this.$store.dispatch('thread/delete', this.threadId)
    }
  }
}
</script>