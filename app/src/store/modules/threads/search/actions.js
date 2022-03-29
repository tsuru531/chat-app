import Router from '@/router';
import algoliasearch from 'algoliasearch/lite';
import { shapeFilters } from '@/helpers/definition';
import { initialState } from './state';

export const actions = {
	async search({ state, commit, dispatch }) {
		const filters = {
			topics: state.topics,
			gender: state.gender,
			ages: state.ages,
			places: state.places,
		};
		async function searchWithAlgolia() {
			const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');
			const index = client.initIndex('threads');
			const shapedFilters = shapeFilters(filters);
			const response = await index.search(state.word, { filters: shapedFilters });
			commit('threads/set', response.hits, { root: true });
		}
		function linkToSearch() {
			Router.push({
				path: '/search',
				query: {
					word: state.word,
					...filters,
				},
			}).catch(() => {});
		}
		const path = Router.currentRoute.path;
		const query = Router.currentRoute.query;
		const isSearchPage = path === '/search';
		const isMatchQuery = query.word == state.word
				&& query.topics == state.topics
				&& query.gender == state.gender
				&& query.ages == state.ages
				&& query.places == state.places;
		const isInitialState = state.word == initialState.word
				&& state.topics == initialState.topics
				&& state.gender == initialState.gender
				&& state.ages == initialState.ages
				&& state.places == initialState.places;
		if (!isSearchPage) {
			linkToSearch();
			searchWithAlgolia();
		} else {
			if (!isMatchQuery) {
				if (isInitialState) {
					await dispatch('setWord', query.word);
					await dispatch('setTopics', query.topics);
					await dispatch('setGender', query.gender);
					await dispatch('setAges', query.ages);
					await dispatch('setPlaces', query.places);
					searchWithAlgolia();
				} else {
					searchWithAlgolia();
					linkToSearch();
				}
			} else if (isInitialState) {
				searchWithAlgolia();
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
