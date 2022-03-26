import algoliasearch from 'algoliasearch/lite';

export const actions = {
	async search({ state, commit }) {
		const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');
		const index = client.initIndex('threads');
		const topics = state.topics.map(topic => {
			if (topic === "") return undefined;
			return `topic:${topic}`;
		});
		let gender = undefined;
		if (state.gender !== "") {
			gender = `gender:${state.gender}`;
		}
		const ages = state.ages.map(age => {
			if (age === "") return undefined;
			return `age:${age}`;
		});
		const places = state.places.map(place => {
			if (place === "") return undefined;
			return `place:${place}`;
		});
		const filters = [topics, gender, ages, places];
		const shapedFilters = filters.map(filter => {
			if (typeof filter === 'object') {
				if (filter[0] === undefined) return undefined;
				return `(${filter.join(' OR ')})`;
			}
			if (filter === undefined) return undefined;
			return filter;
		}).filter(v => v).join(' AND ');
		const response = await index.search(state.word, { filters: shapedFilters });
		commit('threads/set', response.hits, { root: true });
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
