import { initialState } from './state';

export const mutations = {
  setThread(state, { id, uid, title, topic, gender, age, place, showId, characterLimit, limitCount, commentsCount }) {
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
    state.commentsCount = commentsCount;
  },
  resetThread(state) {
    Object.assign(state, {
      ...initialState,
      comments: state.comments,
      threads: state.threads,
    })
  },
}
