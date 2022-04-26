<template>
<div>
  <Header />
  <SignInForm v-if="isLoaded" />
  <Loading v-else />
</div>
</template>

<script>
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Loading from '@/components/atoms/Loading'
import Header from '@/components/organisms/Header'
import SignInForm from '@/components/organisms/SignInForm'

export default {
  name: 'SignIn',
  components: {
    Loading,
    Header,
    SignInForm
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  mounted() {
    this.$store.dispatch('user/providerSignIn')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push('/')
      } else {
        this.isLoaded = true
      }
    })
  },
}
</script>
