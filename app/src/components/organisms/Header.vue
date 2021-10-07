<template>
<header>
  <div v-if="!isSignedIn">
    <router-link to="/signup">新規登録</router-link> |
    <router-link to="/signin">ログイン</router-link>
  </div>
  <button v-if="isSignedIn">ログアウト</button>
  <div>
    <router-link to="/">Logo</router-link>
  </div>
  <SearchWindow :searchword="searchword" @change="changeSearchword" @search="search" />
  <p>{{ userName }}</p>
  <router-link to="/dashboard">マイページ</router-link>
</header>
</template>

<script>
import SearchWindow from '@/components/molecules/SearchWindow'

export default {
  name: 'Header',
  components: {
    SearchWindow
  },
  data() {
    return {
      searchword: ''
    }
  },
  computed: {
    isSignedIn() {
      return this.$store.getters['user/isSignedIn']
    },
    userName() {
      return this.$store.getters['user/name']
    }
  },
  methods: {
    changeSearchword(value) {
      this.searchword = value
    },
    search() {
      console.log(`search: ${this.searchword}`)
      this.searchword = ''
    }
  }
}
</script>
