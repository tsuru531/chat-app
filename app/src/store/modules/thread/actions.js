import Router from '@/router'
import { db } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'

export const actions = {
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
      commit('setThread', {
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
  async getThread({ commit }, threadId) {
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, threadId)
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data()
    commit('setThread', { ...data })
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
  async watchComments({ commit }, threadId) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('thread_id', '==', threadId), orderBy('index'))
    onSnapshot(q, querySnapshot => {
      let newComments = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        newComments = [
          ...newComments,
          data
        ]
        console.log(data)
      })
      commit('setComments', newComments)
    })
  },
};