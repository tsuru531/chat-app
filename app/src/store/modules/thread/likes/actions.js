import { db } from '@/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

export const actions = {
  async create({ commit }, { userId, commentId, threadId }) {
    const id = `${userId}${commentId}`;
    const collectionRef = collection(db, 'likes');
    const docRef = doc(collectionRef, id);
    const payload = {
      id,
      userId,
      commentId,
      threadId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, payload);
    commit('add', payload);
  },
  async delete({ commit }, { userId, commentId }) {
    const id = `${userId}${commentId}`;
    const collectionRef = collection(db, 'likes');
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);
    commit('remove', id);
  },
  switch({ dispatch, getters }, { userId, commentId, threadId }) {
    const isExist = Boolean(getters.findById(`${userId}${commentId}`));
    if (isExist) {
      dispatch('delete', { userId, commentId });
    } else {
      dispatch('create', { userId, commentId, threadId });
    }
  },
  watch({ commit }, threadId) {
    const collectionRef = collection(db, 'likes');
    const q = query(collectionRef, where('threadId', '==', threadId));
    onSnapshot(q, querySnapshot => {
      let likes = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        likes = [...likes, data];
      });
      commit('set', likes);
    });
  }
};