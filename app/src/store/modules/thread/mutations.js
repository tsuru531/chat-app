import { initialState } from './state';

export const mutations = {
  set(state, { id, uid, title, topic, gender, age, place, showId, characterLimit, limitCount }) {
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
  },
  resetThread(state) {
    Object.assign(state, {
      ...initialState,
      threads: state.threads,
    })
  },
}
