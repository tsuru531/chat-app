<template>
<ChatBoard :title="title" />
</template>

<script>
import ChatBoard from '@/components/templates/ChatBoard'

export default {
  name: 'ChatBoardPage',
  components: {
    ChatBoard
  },
  computed: {
    title() {
      return this.$store.getters['thread/title']
    }
  },
  created() {
    const threadId = this.$route.params.thread_id
    this.$store.dispatch('thread/getThread', threadId)
    this.$store.dispatch('thread/watchComments', threadId)
  }
}
</script>