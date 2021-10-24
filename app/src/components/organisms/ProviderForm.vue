<template>
<form>
  <div>
    <button type="button" @click="signInWithGoogle">Google アカウントでログイン</button>
  </div>
  <div>
    <button type="button" @click="signInByTwitter">Twitter アカウントでログイン</button>
  </div>
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