<template>
<Error errorMessage="メール認証をしてください" />
</template>

<script>
import Error from '@/components/templates/Error.vue'
export default {
  name: 'NotEmailVerified',
  components: {
    Error
  }
}
</script>