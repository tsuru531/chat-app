export const getters = {
  isSignedIn: state => state.isSignedIn,
  isEmailVerified: state => state.isEmailVerified,
  uid: state => state.uid,
  name: state => state.name,
  isHaveThreadPermission: (state, getters, rootState, rootGetters) => {
    const { role, uid } = state
    const threadUid = rootGetters['thread/uid']
    if (role === 'admin') return true
    if (uid === threadUid) return true
    return false
  },
  isAdmin: state => {
    const { role } = state
    const isAdmin = role === 'admin'
    return isAdmin
  }
}