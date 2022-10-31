import { initialState } from './state';

export const mutations = {
  set(state, { id, uid, title, topic, gender, age, place, showId, characterLimit, limitCount, comments }) {
    state.id = id;
    state.uid = uid;
    state.title = title;
    state.topic = topic;
    state.gender = gender;
    state.age = age;
    state.place = place;
    state.showId = showId;
    state.characterLimit = characterLimit;
    state.limitCount = limitCount;
    state.comments = comments;
  },
  resetThread(state) {
    Object.assign(state, {
      ...initialState,
      comments: state.comments,
      threads: state.threads,
    })
  },
}
