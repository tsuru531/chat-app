<template>
<Card>
  <CardTitle :value="thread.title" />
  <CommentsCounter :count="thread.commentsCount" />
  <ChipsList :values="chipValues" />
</Card>
</template>

<script>
import Card from '@/components/atoms/Card'
import CardTitle from '@/components/atoms/CardTitle'
import CommentsCounter from '@/components/atoms/CommentsCounter'
import ChipsList from '@/components/molecules/ChipsList'

export default {
  name: 'ThreadCard',
  components: {
    Card,
    CardTitle,
    CommentsCounter,
    ChipsList
  },
  props: {
    thread: Object
  },
  computed: {
    chipValues() {
      const { topic, gender, age, place } = this.thread
      const originValues = [topic, gender, age, place]
      const filterValues = originValues.filter(value => value !== '')
      return filterValues
    }
  }
}
</script>

<style scoped>

</style>