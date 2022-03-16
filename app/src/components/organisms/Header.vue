<template>
<header>
  <div>
    <router-link to="/">
      <LogoText />
    </router-link>
  </div>
  <SearchWindow :searchword="searchword" @change="changeSearchword" @search="search" />
  <div v-if="!isSignedIn">
    <router-link to="/signup">
      <TextButton value="新規登録" />
    </router-link>
    <router-link to="/signin">
      <TextButton value="ログイン" />
    </router-link>
  </div>
  <TextButton v-if="isSignedIn" @click="signOut" value="ログアウト" />
  <p>{{ userName }}</p>
  <router-link to="/dashboard">
    <TextButton value="マイページ" />
  </router-link>
</header>
</template>

<script>
import LogoText from '@/components/atoms/LogoText'
import TextButton from '@/components/atoms/TextButton'
import SearchWindow from '@/components/molecules/SearchWindow'

export default {
  name: 'Header',
  components: {
    LogoText,
    SearchWindow,
    TextButton
  },
  computed: {
    isSignedIn() {
      return this.$store.getters['user/isSignedIn']
    },
    userName() {
      return this.$store.getters['user/name']
    },
    searchword() {
      return this.$store.getters['threads/search/word']
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('user/signOut')
    },
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
    }
  }
}
</script>

<style scoped>
header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 64px;
  padding: 8px;
}
</style>