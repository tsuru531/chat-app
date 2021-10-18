import Router from '@/router'
import { db } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'

export const actions = {
  async createThread({ commit, dispatch, rootGetters }, { title, comment, topic, gender, age, place, show_id, character_limit, limit_count }) {
    const uid = rootGetters['user/uid']
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef)
    const id = docRef.id
    const handlename = ''
    const timestamp = serverTimestamp()
    const payload = {
      id,
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
    try {
      await setDoc(docRef, payload)
      commit('setThread', {
        id,
        title,
        topic,
        gender,
        age,
        place,
        show_id,
        character_limit,
        limit_count
      })
      dispatch('addComment', {
        thread_id: id,
        handlename,
        content: comment
      })
      Router.push(`/thread/${id}`)
    } catch (error) {
      console.error(error)
    }
  },
  async addComment({ commit, dispatch, rootGetters }, { thread_id, handlename, content }) {
    if (!handlename) handlename = '名無しさん'
    const collectionRef = collection(db, 'comments')
    const docRef = doc(collectionRef)
    const id = docRef.id
    const uid = rootGetters['user/uid']
    const comments = await dispatch('getComments', thread_id)
    let lastComment
    if (comments[0]) {
      lastComment = comments.slice(-1)[0]
    } else {
      lastComment = { index: 0 }
    }
    const index = lastComment.index + 1
    const isPinned = false
    const timestamp = serverTimestamp()
    const payload = {
      id,
      uid,
      thread_id,
      content,
      index,
      handlename,
      isPinned,
      created_at: timestamp,
      updated_at: timestamp
    }
    try {
      await setDoc(docRef, payload)
      commit('addComment', {
        id,
        uid,
        content,
        index,
        handlename,
        isPinned,
        timestamp
      })
    } catch (error) {
      console.error(error)
    }
  },
  async getThread({ commit }, thread_id) {
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef, thread_id)
    const docSnapshot = await getDoc(docRef)
    const data = docSnapshot.data()
    commit('setThread', { ...data })
    return data
  },
  watchThreads({ commit }) {
    const collectionRef = collection(db, 'threads')
    const q = query(collectionRef, orderBy('updated_at', 'desc'))
    onSnapshot(q, querySnapshot => {
      let threads = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        threads = [
          ...threads,
          data
        ]
      })
      commit('setThreads', threads)
    })
  },
  async getComments({ commit }, thread_id) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('thread_id', '==', thread_id), orderBy('index'))
    const querySnapshot = await getDocs(q)
    let comments = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      comments = [
        ...comments,
        data
      ]
    })
    commit('setComments', comments)
    return comments
  },
  watchComments({ commit }, thread_id) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('thread_id', '==', thread_id), orderBy('index'))
    onSnapshot(q, querySnapshot => {
      let comments = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        comments = [
          ...comments,
          data
        ]
      })
      commit('setComments', comments)
    })
  },
};