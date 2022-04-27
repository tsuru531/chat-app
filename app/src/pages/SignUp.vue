<template>
<div>
  <Header />
  <div class="signup_container">
    <h1>新規登録</h1>
    <SignUpForm v-if="isLoaded" />
    <Loading v-else />
  </div>
</div>
</template>

<script>
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Loading from '@/components/atoms/Loading'
import Header from '@/components/organisms/Header'
import SignUpForm from '@/components/organisms/SignUpForm'

export default {
  name: 'SignUpPage',
  components: {
    Loading,
    Header,
    SignUpForm,
  },
    data() {
    return {
      isLoaded: false,
    }
  },
  mounted() {
    this.$store.dispatch('user/providerSignUp')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push('/', () => {})
      } else {
        this.isLoaded = true
      }
    })
  },
}
</script>

<style scoped>
.signup_container {
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
