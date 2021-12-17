export const getters = {
  id: state => state.id,
  uid: state => state.uid,
  title: state => state.title,
  threads: state => state.threads,
  comments: state => state.comments,
  commentsCount: state => state.commentsCount,
  comment: state => index => {
    return state.comments.find(comment => comment.index == index)
  }
};