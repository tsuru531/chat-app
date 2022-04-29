<template>
<div class="zoning">
  <div class="zoning-top centering">
    <Header />
    <Thread @reply="reply" />
  </div>
  <div class="zoning-bottom">
    <ResponseForm
      ref="response_form"
      :response="response"
      :handlename="handlename"
      @change_response="changeResponse"
      @change_handlename="changeHandlename"
      @send="sendComment"
    />
  </div>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import Thread from '@/components/organisms/Thread'
import ResponseForm from '@/components/molecules/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    Header,
    Thread,
    ResponseForm,
  },
  data() {
    return {
      response: '',
      handlename: ''
    }
  },
  computed: {
    threadId() {
      return this.$route.params.thread_id
    }
  },
  methods: {
    reply(index) {
      this.response = `>>${index}\n${this.response}`
      this.$refs.response_form.focusTextarea()
    },
    changeResponse(value) {
      this.response = value
    },
    changeHandlename(value) {
      this.handlename = value
    },
    sendComment() {
      this.$store.dispatch('thread/addComment', {
        threadId: this.threadId,
        handlename: this.handlename,
        content: this.response
      })
      this.response = ''
    }
  },
  created() {
    this.$store.dispatch('thread/getThread', this.threadId)
    this.$store.dispatch('thread/watchComments', this.threadId)
    this.$store.dispatch('thread/likes/watch', this.threadId)
  }
}
</script>

<style scoped>
.zoning {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.zoning-top {
  flex: 1;
  overflow-y: scroll;
}
.zoning-bottom {
  padding: 0 16px 32px;
}
.centering {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
