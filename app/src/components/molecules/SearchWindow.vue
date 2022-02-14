<template>
<form class="search_window">
  <SearchIconButton @click="search" />
  <input
    class="search_window-input"
    type="search"
    placeholder="スレッドを検索する"
    v-model="input_searchword"
    @keydown.enter.exact.prevent
    @keyup.enter.exact="search"
  />
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
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
}
.search_window-input {
  appearance: none;
  outline: none;
  border: none;
}
</style>