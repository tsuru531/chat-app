<template>
<div>
  <Header />
  <p>{{ errorMessage }}</p>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'

export default {
  name: 'Error',
  components: {
    Header
  },
  props: {
    errorMessage: String
  }
}
</script>