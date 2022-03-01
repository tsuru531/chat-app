export const getters = {
  id: state => state.id,
  uid: state => state.uid,
  title: state => state.title,
  comments: state => state.comments,
  commentsCount: state => state.commentsCount,
  comment: state => index => {
    return state.comments.find(comment => comment.index == index)
  },
  commentWithId: state => id => {
    const comment = state.comments.find(comment => comment.id == id);
    return comment;
  },
  commentIsReported: (state, getters, rootState, rootGetters) => commentId => {
    if (typeof state.comments.find === 'undefined') return false;
    const uid = rootGetters['user/uid'];
    const comment = state.comments.find(comment => comment.id == commentId);
    const report = comment.report;
    const isReported = report.includes(uid);
    return isReported;
  },
};