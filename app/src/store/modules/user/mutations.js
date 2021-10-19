export const mutations = {
  signIn(state, { uid, name }) {
    state.isSignedIn = true
    state.uid = uid
    state.name = name
  },
  signOut(state) {
    state.isSignedIn = false
    state.uid = ''
    state.name = ''
  }
}