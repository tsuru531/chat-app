import Router from '@/router';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';
import { createThread, deleteThread } from '@/modules';

export const actions = {
  async createThread({ commit, dispatch, rootGetters }, { title, comment, topic, gender, age, place, showId, characterLimit, limitCount }) {
    const uid = rootGetters['user/uid'];
    const handlename = '';
    const commentsCount = 0;
    const threadData = { uid, title, topic, gender, age, place, showId, characterLimit, limitCount, commentsCount };
    try {
      const payload = await createThread(threadData);
      commit('setThread', payload);
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
  async getThread({ commit }, threadId) {
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, threadId)
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data()
    commit('setThread', { ...data })
    return data
  },
  async delete({ commit }, threadId) {
    await deleteThread(threadId);
    commit('resetThread');
    commit('thread/comments/reset', null, { root: true })
    commit('threads/delete', threadId, { root: true });
    Router.push('/');
  },
}
