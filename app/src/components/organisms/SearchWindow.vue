<template>
<form class="search_window">
  <SearchIconButton @click="search" />
  <input
    class="search_window-input"
    type="search"
    placeholder="スレッドを検索する"
    v-model="searchword"
    @keydown.enter.exact.prevent
    @keyup.enter.exact="search"
  />
  <div class="search_window-filter_wrapper">
    <FilterIconButton @click="toggleFilter" />
    <div class="search_window-filter_window" v-if="isOpenFilter">
      <FilterWindow />
    </div>
  </div>
</form>
</template>

<script>
import SearchIconButton from '@/components/atoms/SearchIconButton'
import FilterIconButton from '@/components/atoms/FilterIconButton'
import FilterWindow from '@/components/organisms/FilterWindow'

export default {
  name: 'SearchWindow',
  components: {
    SearchIconButton,
    FilterIconButton,
    FilterWindow
  },
  data() {
    return {
      isOpenFilter: false,
    }
  },
  computed: {
    searchword: {
      get: function () {
        return this.$store.getters['threads/search/word']
      },
      set: function (value) {
        this.$store.dispatch('threads/search/setWord', value)
      }
    }
  },
  methods: {
    search() {
      this.$store.dispatch('threads/search/search')
    },
    toggleFilter() {
      this.isOpenFilter = !this.isOpenFilter
    },
  }
}
</script>

<style scoped>
.search_window {
  display: flex;
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  padding: 4px;
  box-sizing: border-box;
}
.search_window-input {
  appearance: none;
  outline: none;
  border: none;
}
.search_window-filter_wrapper {
  position: relative;
}
.search_window-filter_window {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  width: 240px;
  height: 0;
  margin-top: 44px;
  margin-right: 4px;
  max-height: calc(-44px + 100vh);
  max-width: calc(-24px + 100vw);
}
</style>