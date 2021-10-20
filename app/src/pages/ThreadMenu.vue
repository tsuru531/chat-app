<template>
<ThreadMenu :threadId="threadId" />
</template>

<script>
import ThreadMenu from '@/components/templates/ThreadMenu'

export default {
  name: 'ThreadMenuPage',
  components: {
    ThreadMenu
  },
  computed: {
    threadId() {
      return this.$route.params.thread_id
    },
  },
  created() {
    this.$store.dispatch('thread/getThread', this.threadId)
  }
}
</script>