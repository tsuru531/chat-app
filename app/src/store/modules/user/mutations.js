import { initialState } from "./state"

export const mutations = {
  signIn(state, { uid, name }) {
    state.isSignedIn = true
    state.uid = uid
    state.name = name
  },
  emailVerification(state) {
    state.isEmailVerified = true
  },
  signOut(state) {
    Object.assign(state, { ...initialState })
  }
}