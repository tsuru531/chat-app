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
    return this.$store.dispatch('thread/getThread', this.$route.params.thread_id)
  }
}
</script>