import { createComment } from '@/modules'
import { db } from '@/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

export const actions = {
  async create ({ commit, dispatch, rootGetters }, { threadId, handlename, content }) {
    if (!handlename) handlename = '名無しさん';
    const uid = rootGetters['user/uid'];
    const comments = await dispatch('getComments', threadId);
    let lastComment;
    if (comments[0]) {
      lastComment = comments.slice(-1)[0]
    } else {
      lastComment = { index: 0 }
    }
    const index = lastComment.index + 1;
    const isPinned = false;
    const isDeleted = false;
    const commentData = { uid, threadId, content, index, handlename, isPinned, isDeleted, report: [] };
    try {
      const payload = await createComment(commentData);
      commit('set', [
        ...comments,
        { ...payload },
      ])
    } catch (error) {
      console.error(error)
    }
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
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('threadId', '==', threadId), orderBy('index'))
    const querySnapshot = await getDocs(q)
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
