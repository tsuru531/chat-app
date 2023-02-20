export const getters = {
  array (state) {
    return state.comments.sort((a, b) => a.index - b.index)
  },
  comment: (state) => (index) => {
    const comment = state.comments.find(comment => comment.index == index)
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
