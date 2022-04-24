<template>
<div>
  <Header />
  <h2>新規登録</h2>
  <SignUpForm v-if="isLoaded" />
  <Loading v-else />
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
