export const getters = {
  array (state) {
    return state.comments
  },
  comment: (state) => (commentId) => {
    const comment = state.comments.find(comment => comment.id == commentId)
    return comment
  },
  isReported: (state, getters, rootState, rootGetters) => commentId => {
    if (typeof state.comments.find === 'undefined') return false;
    const uid = rootGetters['user/uid'];
    const comment = state.comments.find(comment => comment.id == commentId);
    const report = comment.report;
    const isReported = report.includes(uid);
    return isReported;
  },
}
