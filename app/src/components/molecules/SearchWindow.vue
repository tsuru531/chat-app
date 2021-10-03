<template>
<form>
  <input type="search" v-model="input_searchword"/>
  <button type="button" @click="search">検索</button>
</form>
</template>

<script>
export default {
  name: 'SearchWindow',
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
