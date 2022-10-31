import { db } from '@/firebase'
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  createComment,
  getComments,
  addReport,
  deleteReport,
} from '@/modules'

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
  async delete (context, commentId) {
    const collectionRef = collection(db, 'comments')
    const docRef = doc(collectionRef, commentId)
    await updateDoc(docRef, {
      isDeleted: true,
      updatedAt: serverTimestamp()
    })
  },
  async addReport({ rootGetters }, commentId) {
    const uid = rootGetters['user/uid']
    const threadId = rootGetters['thread/id']
    await addReport(threadId, commentId, uid)
  },
  async deleteReport({ rootGetters }, commentId) {
    const uid = rootGetters['user/uid']
    const threadId = rootGetters['thread/id']
    await deleteReport(threadId, commentId, uid)
  },
}
