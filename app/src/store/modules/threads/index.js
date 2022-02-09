import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import { search } from './search';

export const threads = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    search
  }
};