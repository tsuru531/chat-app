<template>
<form class="search_window">
  <input type="search" v-model="input_searchword"/>
  <SearchIconButton @click="search" />
</form>
</template>

<script>
import SearchIconButton from '@/components/atoms/SearchIconButton'

export default {
  name: 'SearchWindow',
  components: {
    SearchIconButton
  },
  props: {
    searchword: String
  },
  computed: {
    input_searchword: {
      get: function () {
        return this.searchword
      },
      set: function (value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    search() {
      this.$emit('search')
    }
  }
}
</script>

<style scoped>
.search_window {
  display: flex;
}
</style>