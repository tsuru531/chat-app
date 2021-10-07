<template>
  <form>
    <label for="email" class="label">メールアドレス</label>
    <input type="email" id="email" class="input" v-model="email">
    <label for="password" class="label">パスワード</label>
    <input type="password" id="password" class="input" v-model="password">
    <button type="button" class="button is-primary" @click="signIn">ログイン</button>
  </form>
</template>

<script>
export default {
  name: 'SignInForm',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('user/signIn', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
