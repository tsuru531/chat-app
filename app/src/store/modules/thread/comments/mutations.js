export const mutations = {
  set (state, comments) {
    state.comments = comments
  },
  reset (state) {
    state.comments = []
  },
}
