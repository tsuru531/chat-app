<template>
<div class="chatboard">
  <Header />
  <div class="chatboard-thread">
    <Thread v-if="isLoaded" @reply="reply" />
    <Loading v-else />
  </div>
  <div class="chatboard-form">
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
import Loading from '@/components/atoms/Loading'
import Header from '@/components/organisms/Header'
import Thread from '@/components/organisms/Thread'
import ResponseForm from '@/components/molecules/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    Loading,
    Header,
    Thread,
    ResponseForm,
  },
  data() {
    return {
      isLoaded: false,
      response: '',
      handlename: '',
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
  async mounted() {
    await this.$store.dispatch('thread/getThread', this.threadId)
    this.isLoaded = true
    this.$store.dispatch('thread/watchComments', this.threadId)
    this.$store.dispatch('thread/likes/watch', this.threadId)
  }
}
</script>

<style scoped>
.chatboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.chatboard-thread {
  flex: 1;
  overflow-y: scroll;
  padding: 16px 20px 16px;
}
.chatboard-form {
  padding: 0 16px 32px;
}
</style>
