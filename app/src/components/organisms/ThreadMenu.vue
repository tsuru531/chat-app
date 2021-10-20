<template>
<div>
  <button v-if="isThreadOwner" @click="deleteThread">スレッドを削除する</button>
</div>
</template>

<script>
export default {
  name: 'ThreadMenu',
  computed: {
    isThreadOwner() {
      return this.$store.getters['user/isThreadOwner']
    },
    threadId() {
      return this.$store.getters['thread/id']
    }
  },
  methods: {
    deleteThread() {
      this.$store.dispatch('thread/deleteThread', this.threadId)
    }
  }
}
</script>