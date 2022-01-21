export const mutations = {
  add(state, like) {
    state.likes = [...state.likes, like];
  },
  remove(state, id) {
    state.likes = state.likes.filter(like => like !== id);
  },
  set(state, likes) {
    state.likes = likes;
  }
};