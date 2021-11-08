<template>
<div>
  <CardTitle :value="thread.title" />
  <ChipsList :values="chipValues" />
</div>
</template>

<script>
import CardTitle from '@/components/atoms/CardTitle'
import ChipsList from '@/components/molecules/ChipsList'

export default {
  name: 'ThreadCard',
  components: {
    CardTitle,
    ChipsList
  },
  props: {
    thread: Object
  },
  computed: {
    chipValues: vm => {
      const { topic, gender, age, place } = vm.thread
      const originValues = [topic, gender, age, place]
      const filterValues = originValues.filter(value => value !== '')
      return filterValues
    }
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