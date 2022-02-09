import algoliasearch from 'algoliasearch/lite';

export const actions = {
    async search({ state, commit }) {
        const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');
        const index = client.initIndex('threads');
        const hits = await index.search(state.word);
        commit('setHits', hits.hits);
    },
    setWord({ commit, dispatch }, word) {
        commit('setWord', word);
        dispatch('search');
    },
};
