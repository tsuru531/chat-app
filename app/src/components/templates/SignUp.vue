<template>
<div>
  <Header />
  <h2>新規登録</h2>
  <form>
    <label for="name">ユーザー名</label>
    <input type="text" id="name" v-model="name">
    <label for="email">メールアドレス</label>
    <input type="email" id="email" v-model="email">
    <label for="password">パスワード</label>
    <input type="password" id="password" v-model="password">
    <button type="button" @click="signUp">新規登録</button>
  </form>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'

export default {
  name: 'SignUp',
  components: {
    Header
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      console.log('signUp')
    }
  }
}
</script>
