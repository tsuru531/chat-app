<template>
<div class="zoning">
  <div class="zoning-top centering">
    <Header />
    <section class="container">
      <header>
        <ThreadHead />
      </header>
      <main>
        <CommentsList />
      </main>
    </section>
  </div>
  <div class="zoning-bottom">
    <ResponseForm
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
import ThreadHead from '@/components/organisms/ThreadHead'
import CommentsList from '@/components/organisms/CommentsList'
import ResponseForm from '@/components/molecules/ResponseForm'

export default {
  name: 'ChatBoard',
  components: {
    Header,
    ThreadHead,
    CommentsList,
    ResponseForm
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
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
  padding: 16px;
}
</style>