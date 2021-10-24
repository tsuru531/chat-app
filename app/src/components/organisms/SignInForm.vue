<template>
<div>
  <form>
    <div>
      <label for="email" class="label">メールアドレス</label>
      <input type="email" id="email" class="input" v-model="email">
    </div>
    <div>
      <label for="password" class="label">パスワード</label>
      <input type="password" id="password" class="input" v-model="password">
    </div>
    <div>
      <button type="button" @click="signIn">ログイン</button>
    </div>
  </form>
  <ProviderForm />
</div>
</template>

<script>
import ProviderForm from '@/components/organisms/ProviderForm'

export default {
  name: 'SignInForm',
  components: {
    ProviderForm
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted() {
    this.$store.dispatch('user/providerSignIn')
  },
  methods: {
    signIn() {
      this.$store.dispatch('user/signInWithEmailNPassword', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
