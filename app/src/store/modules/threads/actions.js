import Router from '@/router'
import { db } from '@/firebase'
import {
  collection,
  doc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'

export const actions = {
  async delete({ commit, dispatch }, threadId) {
    dispatch('thread/deleteComments', threadId)
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, threadId)
    await deleteDoc(docRef)
    commit('thread/reset', { root: true })
    Router.push('/')
  },
  watch({ commit }) {
    const collectionRef = collection(db, 'threads')
    const q = query(collectionRef, orderBy('updatedAt', 'desc'))
    onSnapshot(q, querySnapshot => {
      let threads = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        threads = [
          ...threads,
          data
        ]
      })
      commit('set', threads)
    })
  }
};