<template>
<div class="form_wrapper">
  <form class="signin_form">
    <InputEmail :value="email" @change="changeEmail" />
    <InputPassword :value="password" @change="changePassword" />
    <button type="button" @click="signIn">ログイン</button>
  </form>
  <ProviderForm />
</div>
</template>

<script>
import InputEmail from '@/components/molecules/InputEmail'
import InputPassword from '@/components/molecules/InputPassword'
import ProviderForm from '@/components/organisms/ProviderForm'

export default {
  name: 'SignInForm',
  components: {
    InputEmail,
    InputPassword,
    ProviderForm,
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    changeEmail(email) {
      this.email = email
    },
    changePassword(password) {
      this.password = password
    },
    signIn() {
      this.$store.dispatch('user/signInWithEmailAndPassword', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.form_wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.signin_form {
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
