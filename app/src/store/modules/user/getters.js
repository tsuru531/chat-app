export const getters = {
  isSignedIn: state => state.isSignedIn,
  isEmailVerified: state => state.isEmailVerified,
  uid: state => state.uid,
  name: state => state.name,
  isHaveThreadPermission: (state, getters, rootState, rootGetters) => {
    const role = state.role
    const uid = state.uid
    const threadUid = rootGetters['thread/uid']
    if (role === 'admin') return true
    if (uid === threadUid) return true
    return false
  }
}