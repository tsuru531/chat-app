<template>
<div class="chatboard">
  <Header />
  <div class="chatboard-thread_wrapper" ref="thread">
    <div class="chatboard-thread">
      <Thread v-if="isLoaded" @reply="reply" />
      <Loading v-else />
    </div>
  </div>
  <div class="chatboard-form_wrapper">
    <div class="chatboard-form">
      <ResponseForm ref="response_form" :body="body" @change="changeBody" />
    </div>
  </div>
</div>
</template>

<script>
import Loading from '@/components/atoms/Loading'
import Header from '@/components/organisms/Header'
import Thread from '@/components/organisms/Thread'
import ResponseForm from '@/components/organisms/ResponseForm'

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
      body: '',
      isScrolledBottom: false,
    }
  },
  computed: {
    threadId() {
      return this.$route.params.thread_id
    }
  },
  methods: {
    reply(index) {
      this.body = `>>${index}\n${this.body}`
      this.$refs.response_form.focusTextarea()
    },
    changeBody(value) {
      this.body = value
    },
  },
  async mounted() {
    const threadElement = this.$refs.thread
    this.unsubscribeThread = await this.$store.dispatch('thread/watch', this.threadId)
    this.unsubscribeComments = await this.$store.dispatch('thread/comments/watch', this.threadId)
    this.isLoaded = true
    threadElement.addEventListener('scroll', () => {
      if (threadElement.scrollHeight - threadElement.scrollTop - threadElement.clientHeight <= 10) {
        if (!this.isScrolledBottom) {
          this.isScrolledBottom = true
        }
      } else {
        if (this.isScrolledBottom) {
          this.isScrolledBottom = false
        }
      }
    })
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'thread/setComments') {
        if (this.isScrolledBottom) {
          const scrollOptions = {
            left: 0,
            top: threadElement.scrollHeight - threadElement.clientHeight,
            behavior: 'smooth'
          }
          threadElement.scrollTo(scrollOptions)
        }
      }
    })
  },
  unmounted() {
    this.unsubscribeThread()
    this.unsubscribeComments()
  },
}
</script>

<style scoped>
.chatboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.chatboard-thread_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow-y: scroll;
  width: 100%;
}
.chatboard-thread {
  box-sizing: border-box;
  width: min(100%, 760px);
  padding: 16px 20px 16px;
}
.chatboard-form_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.chatboard-form {
  box-sizing: border-box;
  width: min(100%, 760px);
  padding: 0 16px 32px;
}
</style>
