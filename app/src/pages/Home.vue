<template>
<div class="home-wrapper">
  <Header />
  <ThreadsList v-if="isLoaded" />
  <Loading v-else />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import ThreadsList from '@/components/organisms/ThreadsList'
import Loading from '../components/atoms/Loading.vue'

export default {
  name: 'Home',
  components: {
    Header,
    ThreadsList,
    Loading,
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('threads/getPopularity')
    this.isLoaded = true
  },
}
</script>

<style scoped>
  .home-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
