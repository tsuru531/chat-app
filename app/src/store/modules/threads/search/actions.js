import Router from '@/router';
import algoliasearch from 'algoliasearch/lite';

export const actions = {
    async search({ state, commit }) {
        const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');
        const index = client.initIndex('threads');
        const hits = await index.search(state.word);
        commit('threads/set', hits.hits, { root: true });
        if (Router.currentRoute.path !== '/search') {
            Router.push('/search');
        }
    },
    setWord({ commit }, word) {
        commit('setWord', word);
    },
};
