export const mutations = {
  createThread(state, { id, title, topic, gender, age, place, show_id, character_limit, limit_count }) {
    state.id = id
    state.title = title
    state.topic = topic
    state.gender = gender
    state.age = age
    state.place = place
    state.show_id = show_id
    state.character_limit = character_limit
    state.limit_count = limit_count
  },
  addComment(state, { id, uid, content, index, handlename, isPinned, timestamp }) {
    state.comments = [...state.comments, {
      id,
      uid,
      content,
      index,
      handlename,
      isPinned,
      timestamp
    }]
  },
  setThreads(state, threads) {
    state.threads = threads
  }
};