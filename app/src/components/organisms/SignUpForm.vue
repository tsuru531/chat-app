<template>
<form>
  <div>
    <label for="name">ユーザー名</label>
    <input type="text" id="name" v-model="name">
  </div>
  <div>
    <label for="email">メールアドレス</label>
    <input type="email" id="email" v-model="email">
  </div>
  <div>
    <label for="password">パスワード</label>
    <input type="password" id="password" v-model="password">
  </div>
  <div>
    <button type="button" @click="signUp">新規登録</button>
  </div>
  <div>
    <button type="button" @click="signInWithGoogle">Google アカウントでログイン</button>
  </div>
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
  mounted() {
    this.$store.dispatch('user/snsSignUp')
  },
  methods: {
    signUp() {
      this.$store.dispatch('user/signUp', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    },
    signInWithGoogle() {
      this.$store.dispatch('user/signInWithGoogle')
    }
  }
}
</script>
