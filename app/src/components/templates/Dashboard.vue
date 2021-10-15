<template>
<div>
  <Header />
  <router-link to="/thread/post">スレッドを作成する</router-link>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'

export default {
  name: 'Dashboard',
  components: {
    Header
  }
}
</script>
