import {
  createComment,
  getComments,
  watchComments,
  removeComment,
  createLike,
  deleteLike,
  addReport,
  deleteReport,
} from '@/modules'

export const actions = {
  async create ({ rootGetters }, { threadId, handlename, body }) {
    if (!handlename) handlename = '名無しさん'
    const uid = rootGetters['user/uid']
    await createComment(threadId, uid, handlename, body)
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
  async get({ dispatch }, threadId) {
    const querySnapshot = await getComments(threadId)
    const comments = dispatch('set', querySnapshot)
    return comments
  },
  async watch({ commit }, threadId) {
    const unsubscribe = await watchComments(threadId, (list) => commit('set', list))
    return unsubscribe
  },
  async delete({ rootGetters }, index) {
    const threadId = rootGetters['thread/id']
    await removeComment(threadId, index)
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
