<template>
<div class="form_wrapper">
  <form class="signup_form">
    <InputName :value="name" @change="changeName" />
    <InputEmail :value="email" @change="changeEmail" />
    <InputPassword :value="password" @change="changePassword" />
    <button type="button" @click="signUp">新規登録</button>
  </form>
  <ProviderForm />
</div>
</template>

<script>
import InputName from '@/components/molecules/InputName'
import InputEmail from '@/components/molecules/InputEmail'
import InputPassword from '@/components/molecules/InputPassword'
import ProviderForm from '@/components/organisms/ProviderForm'

export default {
  name: 'SignUpForm',
  components: {
    InputName,
    InputEmail,
    InputPassword,
    ProviderForm,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    changeName(name) {
      this.name = name
    },
    changeEmail(email) {
      this.email = email
    },
    changePassword(password) {
      this.password = password
    },
    signUp() {
      this.$store.dispatch('user/signUpWithEmailAndPassword', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    },
  }
}
</script>

<style scoped>
.form_wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.signup_form {
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
