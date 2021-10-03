<template>
<div>
  <button>会員登録</button>
  <button>ログイン</button>
  <button>ログアウト</button>
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
