<template>
<div class="search-wrapper">
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
		this.$store.dispatch('threads/search/search')
	},
}
</script>

<style scoped>
	.search-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
