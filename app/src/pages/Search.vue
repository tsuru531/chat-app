<template>
<div>
	<Header />
	<h1>検索結果</h1>
	<ThreadsList />
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import ThreadsList from '@/components/organisms/ThreadsList'

export default {
	name: 'Search',
	components: {
		Header,
		ThreadsList,
	},
	mounted() {
		const query = this.$route.query
		this.$store.dispatch('threads/search/setWord', query.word)
		this.$store.dispatch('threads/search/search')
	},
}
</script>

<style scoped>

</style>
