<template>
<div class="header-wrapper">
  <header class="header">
    <div>
      <router-link to="/">
        <LogoText />
      </router-link>
    </div>
    <SearchWindow
      :searchword="searchword"
      @change="changeSearchword"
      @search="search"
      @filter="toggleFilter"
    />
    <AccountIconButton @click="toggleDropDown" />
  </header>
  <div class="header-filter-overlay" v-if="isOpenFilter">
    <div class="header-filter">
      <FilterWindow />
    </div>
  </div>
  <div class="header-drop_down-overlay" v-if="isOpenDropDown">
    <div class="header-drop_down">
      <DropDownMenu />
    </div>
  </div>
</div>
</template>

<script>
import LogoText from '@/components/atoms/LogoText'
import AccountIconButton from '@/components/atoms/AccountIconButton'
import SearchWindow from '@/components/molecules/SearchWindow'
import FilterWindow from '@/components/organisms/FilterWindow'
import DropDownMenu from '@/components/organisms/DropDownMenu'

export default {
  name: 'Header',
  components: {
    LogoText,
    AccountIconButton,
    SearchWindow,
    FilterWindow,
    DropDownMenu,
  },
  data() {
    return {
      isOpenFilter: false,
      isOpenDropDown: false,
    }
  },
  computed: {
    searchword() {
      return this.$store.getters['threads/search/word']
    }
  },
  methods: {
    changeSearchword(value) {
      this.$store.dispatch('threads/search/setWord', value)
    },
    search() {
      const isSearchPage = this.$router.currentRoute.path === '/search'
      const isMatchQuery = this.$route.query.word === this.searchword
      if (!isMatchQuery) {
        this.$router.push({
          path: '/search',
          query: {
            word: this.searchword,
          },
        })
        if (isSearchPage) {
          const query = this.$route.query
          this.$store.dispatch('threads/search/setWord', query.word)
          this.$store.dispatch('threads/search/search')
        }
      }
    },
    toggleFilter() {
      this.isOpenFilter = !this.isOpenFilter
    },
    toggleDropDown() {
      this.isOpenDropDown = !this.isOpenDropDown
    },
  }
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 64px;
  padding: 8px;
}
</style>
