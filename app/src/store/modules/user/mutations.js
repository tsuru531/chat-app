import { initialState } from "./state"

export const mutations = {
  signIn(state, { uid, name, role }) {
    state.isSignedIn = true
    state.uid = uid
    state.name = name
    state.role = role
  },
  emailVerification(state) {
    state.isEmailVerified = true
  },
  signOut(state) {
    Object.assign(state, { ...initialState })
  }
}