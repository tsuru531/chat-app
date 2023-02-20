export const mutations = {
  set(state, threads) {
    state.threads = threads;
  },
  add(state, thread) {
    state.threads = {
      ...state.threads,
      thread,
    };
  },
  delete(state, threadId) {
    const newThreads = state.threads.filter((thread) => {
      return thread.id !== threadId;
    });
    state.threads = newThreads;
  },
};
