<template>
<div>
  <router-link to="/signup" v-if="!isSignedIn">会員登録</router-link> |
  <router-link to="/signin" v-if="!isSignedIn">ログイン</router-link>
  <button v-if="isSignedIn">ログアウト</button>
  <div>Logo</div>
  <SearchWindow :searchword="searchword" @change="changeSearchword" @search="search" />
  <button>マイページ</button>
</div>
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
