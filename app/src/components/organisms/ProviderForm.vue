<template>
<form class="form">
  <button type="button" @click="signInWithGoogle">Google アカウントでログイン</button>
  <button type="button" @click="signInByTwitter">Twitter アカウントでログイン</button>
</form>
</template>

<script>
export default {
  name: 'ProviderForm',
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('user/signInWithGoogle')
    },
    signInByTwitter() {
      this.$store.dispatch('user/signInByTwitter')
    }
  }
}
</script>

<style scoped>
.form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(100%, 400px);
  padding: 16px;
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
}
</style>
