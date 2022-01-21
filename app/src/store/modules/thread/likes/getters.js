export const getters = {
  findById: state => id => {
    const like = state.likes.find(like => like.id === id);
    return like;
  }
};