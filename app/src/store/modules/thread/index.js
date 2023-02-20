import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { comments } from './comments'

export const thread = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    comments,
  },
}
