<template>
<div>
  <CardTitle :value="title" />
</div>
</template>

<script>
import CardTitle from '@/components/atoms/CardTitle'

export default {
  name: 'ThreadCard',
  components: {
    CardTitle
  },
  props: {
    title: String
  }
}
</script>

<style scoped>
div {
  background-color: #FFFFFF;
  padding: 16px;
  border-radius: 4px;
  box-shadow:
    0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>