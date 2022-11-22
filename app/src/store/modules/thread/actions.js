import Router from '@/router';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';
import { createThread, deleteThread, watchThread } from '@/modules';

export const actions = {
  async createThread({ commit, dispatch, rootGetters }, { title, comment, topic, gender, age, place, showId, characterLimit, limitCount }) {
    const uid = rootGetters['user/uid'];
    const handlename = '';
    const threadData = { uid, title, topic, gender, age, place, showId, characterLimit, limitCount };
    try {
      const payload = await createThread(threadData);
      commit('set', payload);
      await dispatch('thread/comments/create', {
        threadId: payload.id,
        handlename,
        content: comment,
      }, { root: true });
      dispatch('threads/add', payload, { root: true });
      Router.push(`/thread/${payload.id}`);
    } catch (error) {
      console.error(error);
    }
  },
  async get({ commit }, threadId) {
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, threadId)
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data()
    commit('set', { ...data })
    return data
  },
  async watch({ commit }, threadId) {
    const unsubscribe = await watchThread(threadId, (thread) => {
      commit('set', thread)
      commit('thread/comments/set', thread.comments, { root: true })
    })
    return unsubscribe
  },
  async delete({ commit }, threadId) {
    await deleteThread(threadId);
    commit('resetThread');
    commit('thread/comments/reset', null, { root: true })
    commit('threads/delete', threadId, { root: true });
    Router.push('/');
  },
}
