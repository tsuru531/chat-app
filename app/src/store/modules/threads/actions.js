import Router from '@/router';
import { db } from '@/firebase';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { watchThreads } from '@/modules';

export const actions = {
  add({ commit }, thread) {
    commit('add', thread);
  },
  async delete({ commit, dispatch }, threadId) {
    dispatch('thread/deleteComments', threadId)
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, threadId)
    await deleteDoc(docRef)
    commit('thread/reset', { root: true })
    Router.push('/')
  },
  async watch({ commit }) {
    const unsubscribe = await watchThreads((threads) => {
      commit('set', threads);
    });
    return unsubscribe;
  },
};
