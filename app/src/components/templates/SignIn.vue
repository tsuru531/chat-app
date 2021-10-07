<template>
<div>
  <Header />
  <SignInForm />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import SignInForm from '@/components/organisms/SignInForm'

export default {
  name: 'SignIn',
  components: {
    Header,
    SignInForm
  }
}
</script>
