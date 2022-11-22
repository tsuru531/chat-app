import {
  createComment,
  getComments,
  deleteComment,
  createLike,
  deleteLike,
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
  async delete ({ rootGetters }, commentId) {
    const threadId = rootGetters['thread/id']
    await deleteComment(threadId, commentId)
  },
  async createLike({ rootGetters }, commentId) {
    const uid = rootGetters['user/uid']
    const threadId = rootGetters['thread/id']
    await createLike(threadId, commentId, uid)
  },
  async deleteLike({ rootGetters }, commentId) {
    const uid = rootGetters['user/uid']
    const threadId = rootGetters['thread/id']
    await deleteLike(threadId, commentId, uid)
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
