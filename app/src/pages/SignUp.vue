<template>
<div>
  <Header />
  <h2>新規登録</h2>
  <SignUpForm />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import SignUpForm from '@/components/organisms/SignUpForm'

export default {
  name: 'SignUpPage',
  components: {
    Header,
    SignUpForm
  }
}
</script>
