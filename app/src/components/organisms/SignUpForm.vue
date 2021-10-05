<template>
<form>
  <label for="name">ユーザー名</label>
  <input type="text" id="name" v-model="name">
  <label for="email">メールアドレス</label>
  <input type="email" id="email" v-model="email">
  <label for="password">パスワード</label>
  <input type="password" id="password" v-model="password">
  <button type="button" @click="signUp">新規登録</button>
</form>
</template>

<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('user/signUp', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
