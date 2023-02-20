<template>
<span>{{ count }}</span>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    count: {
      type: Number,
      require: true,
    },
  },
}
</script>

<style scoped>

</style>
