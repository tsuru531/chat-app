<template>
<ul>
  <li v-for="value in values" :key="value">
    <Chip :value="value"/>
  </li>
</ul>
</template>

<script>
import Chip from '@/components/atoms/Chip'

export default {
  name: 'ChipsList',
  components: {
    Chip
  },
  props: {
    values: Array
  }
}
</script>

<style scoped>
ul {
  aline-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 7px 11px;
  margin: 0;
}
li {
  list-style: none;
  margin: 6px 6px 0 0;
  max-width: 100%;
}
</style>