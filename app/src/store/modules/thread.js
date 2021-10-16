import Router from '@/router'
import { db } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'

export const thread = {
  namespaced: true,
  state: {
    id: '',
    title: '',
    comments: [],
    topic: '',
    gender: '',
    age: '',
    place: '',
    show_id: false,
    character_limit: false,
    limit_count: 0,
    threads: [],
  },
  getters: {
    threads: state => state.threads,
  },
  mutations: {
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
  },
  actions: {
    async createThread({ commit, rootGetters }, { title, comment, topic, gender, age, place, show_id, character_limit, limit_count }) {
      const uid = rootGetters['user/uid']
      const threadsRef = collection(db, 'threads')
      const commentsRef = collection(db, 'comments')
      const threadRef = doc(threadsRef)
      const commentRef = doc(commentsRef)
      const threadId = threadRef.id
      const commentId = commentRef.id
      const index = 1
      const handlename = '名無しさん'
      const isPinned = false
      const timestamp = serverTimestamp()
      const threadPayload = {
        id: threadId,
        uid,
        title,
        topic,
        gender,
        age,
        place,
        show_id,
        character_limit,
        limit_count,
        created_at: timestamp,
        updated_at: timestamp
      }
      const commentPayload = {
        id: commentId,
        uid,
        thread_id: threadId,
        content: comment,
        index,
        handlename,
        isPinned,
        created_at: timestamp,
        updated_at: timestamp
      }
      try {
        await setDoc(threadRef, threadPayload)
        await setDoc(commentRef, commentPayload)
        commit('createThread', {
          id: threadId,
          title,
          topic,
          gender,
          age,
          place,
          show_id,
          character_limit,
          limit_count
        })
        commit('addComment', {
          id: commentId,
          uid,
          content: comment,
          index,
          handlename,
          isPinned,
          timestamp
        })
        Router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
    async watchThreads({ commit }) {
      const collectionRef = collection(db, 'threads')
      const q = query(collectionRef, orderBy('updated_at', 'desc'))
      onSnapshot(q, querySnapshot => {
        let newThreads = []
        querySnapshot.forEach(doc => {
          const data = doc.data()
          newThreads = [
            ...newThreads,
            data
          ]
        })
        commit('setThreads', newThreads)
      })
    },
  },
  modules: {
  }
}