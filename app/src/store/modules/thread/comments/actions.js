import { createComment, getComments } from '@/modules'
import { db } from '@/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

export const actions = {
  async create ({ rootGetters }, { threadId, handlename, content }) {
    if (!handlename) handlename = '名無しさん'
    const uid = rootGetters['user/uid']
    await createComment(threadId, uid, handlename, content)
  },
  set ({ commit }, commentsSnap) {
    if (commentsSnap) {
      let comments = []
      commentsSnap.forEach(doc => {
        const data = doc.data({ serverTimestamps: "estimate" })
        const createdAt = data.createdAt.toDate()
        comments = [
          ...comments,
          {
            ...data,
            createdAt
          }
        ]
      })
      commit('set', comments)
      return comments
    }
  },
  async get ({ dispatch }, threadId) {
    const querySnapshot = await getComments(threadId)
    const comments = dispatch('set', querySnapshot)
    return comments
  },
  watch ({ dispatch }, threadId) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('threadId', '==', threadId), orderBy('index'))
    onSnapshot(q, querySnapshot => {
      dispatch('set', querySnapshot)
    })
  },
  async switchReport({ getters, rootGetters }, commentId) {
    const comment = getters.commentWithId(commentId);
    const uid = rootGetters['user/uid'];
    const isReported = getters.commentIsReported(commentId);
    let report;
    if (isReported) {
      report = comment.report.filter(id => id !== uid);
    } else {
      report = [...comment.report, uid];
    }
    const collectionRef = collection(db, 'comments');
    const docRef = doc(collectionRef, commentId);
    await updateDoc(docRef, {
      report,
      updatedAt: serverTimestamp(),
    });
  },
  async delete (context, commentId) {
    const collectionRef = collection(db, 'comments')
    const docRef = doc(collectionRef, commentId)
    await updateDoc(docRef, {
      isDeleted: true,
      updatedAt: serverTimestamp()
    })
  },
}
