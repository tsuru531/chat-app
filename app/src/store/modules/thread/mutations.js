import { initialState } from './state';

export const mutations = {
  setThread(state, { id, uid, title, topic, gender, age, place, show_id, character_limit, limit_count }) {
    state.id = id
    state.uid = uid
    state.title = title
    state.topic = topic
    state.gender = gender
    state.age = age
    state.place = place
    state.show_id = show_id
    state.character_limit = character_limit
    state.limit_count = limit_count
  },
  resetThread(state) {
    Object.assign(state, {
      ...initialState,
      comments: state.comments,
      threads: state.threads,
    })
  },
  setComments(state, comments) {
    state.comments = comments
  },
  resetComments(state) {
    state.comments = []
  },
  setThreads(state, threads) {
    state.threads = threads
  },
};