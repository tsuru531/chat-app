<template>
<form class="response-form width-main">
  <div>
    <label for="handlename">ハンドルネーム</label>
    <input name="handlename" id="handlename" type="text" placeholder="名無しさん" v-model="handlename">
  </div>
  <div>
    <label for="response">レスポンス</label>
    <textarea name="response" id="response" type="text" v-model="response"></textarea>
  </div>
  <button type="button" @click="addComment">レスポンスを投稿する</button>
</form>
</template>

<script>
export default {
  name: 'ResponseForm',
  data() {
    return {
      handlename: '',
      response: ''
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch('thread/addComment', {
        threadId: this.$route.params.thread_id,
        handlename: this.handlename,
        content: this.response
      })
      this.response = ''
    }
  }
}
</script>

<style scoped>
.response-form {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  padding: 0 16px 32px;
}
</style>