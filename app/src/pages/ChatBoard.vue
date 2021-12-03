<template>
<ChatBoard />
</template>

<script>
import ChatBoard from '@/components/templates/ChatBoard'

export default {
  name: 'ChatBoardPage',
  components: {
    ChatBoard
  },
  computed: {
    threadId() {
      return this.$route.params.thread_id
    }
  },
  created() {
    this.$store.dispatch('thread/getThread', this.threadId)
    this.$store.dispatch('thread/watchComments', this.threadId)
  }
}
</script>