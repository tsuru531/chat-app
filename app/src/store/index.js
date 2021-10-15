import Vue from 'vue'
import Vuex from 'vuex'
import { user, thread } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    thread
  }
})