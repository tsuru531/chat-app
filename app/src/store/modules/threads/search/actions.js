import Router from '@/router';
import algoliasearch from 'algoliasearch/lite';
import { shapeFilters } from '@/helpers/definition';

export const actions = {
	async search({ state, commit, dispatch }) {
		async function searchWithAlgolia() {
			const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');
			const index = client.initIndex('threads');
			const filters = {
				topics: state.topics,
				gender: state.gender,
				ages: state.ages,
				places: state.places,
			};
			const shapedFilters = shapeFilters(filters);
			const response = await index.search(state.word, { filters: shapedFilters });
			commit('threads/set', response.hits, { root: true });
		}
		function linkToSearch() {
			Router.push({
				path: '/search',
				query: { word: state.word },
			});
		}
		const path = Router.currentRoute.path;
		const query = Router.currentRoute.query;
		const isSearchPage = path === '/search';
		const isMatchQuery = query.word === state.word;
		if (!isSearchPage) {
			linkToSearch();
			searchWithAlgolia();
		} else if (!isMatchQuery) {
			if (state.word === '') {
				await dispatch('setWord', query.word);
				searchWithAlgolia();
			} else {
				searchWithAlgolia();
				linkToSearch();
			}
		}
	},
	setWord({ commit }, word) {
		commit('setWord', word);
	},
	setTopics({ commit }, topics) {
		commit('setTopics', topics);
	},
	setGender({ commit }, gender) {
		commit('setGender', gender);
	},
	setAges({ commit }, ages) {
		commit('setAges', ages);
	},
	setPlaces({ commit }, places) {
		commit('setPlaces', places);
	},
};
