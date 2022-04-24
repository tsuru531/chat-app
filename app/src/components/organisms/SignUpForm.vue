<template>
<div>
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
  </form>
  <ProviderForm />
</div>
</template>

<script>
import ProviderForm from '@/components/organisms/ProviderForm'

export default {
  name: 'SignUpForm',
  components: {
    ProviderForm
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
      this.$store.dispatch('user/signUpWithEmailNPassword', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
