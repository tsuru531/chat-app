import Router from '@/router'
import { db } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'

export const actions = {
  async createThread({ commit, dispatch, rootGetters }, { title, comment, topic, gender, age, place, showId, characterLimit, limitCount }) {
    const uid = rootGetters['user/uid']
    const collectionRef = collection(db, 'threads')
    const docRef = doc(collectionRef)
    const id = docRef.id
    const handlename = ''
    const commentsCount = 0
    const threadData = {
      id,
      uid,
      title,
      topic,
      gender,
      age,
      place,
      showId,
      characterLimit,
      limitCount,
      commentsCount,
    }
    const payload = {
      ...threadData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    try {
      await setDoc(docRef, payload)
      commit('setThread', threadData)
      dispatch('addComment', {
        threadId: id,
        handlename,
        content: comment
      })
      Router.push(`/thread/${id}`)
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
    return data
  },
  async delete({ commit, dispatch }, threadId) {
    await dispatch('deleteComments', threadId);
    const collectionRef = collection(db, 'threads');
    const docRef = doc(collectionRef, threadId);
    await deleteDoc(docRef);
    commit('resetThread');
    Router.push('/');
  },
  async addComment({ commit, dispatch, rootGetters }, { threadId, handlename, content }) {
    if (!handlename) handlename = '名無しさん'
    const collectionRef = collection(db, 'comments')
    const docRef = doc(collectionRef)
    const id = docRef.id
    const uid = rootGetters['user/uid']
    const comments = await dispatch('getComments', threadId)
    let lastComment
    if (comments[0]) {
      lastComment = comments.slice(-1)[0]
    } else {
      lastComment = { index: 0 }
    }
    const index = lastComment.index + 1
    const isPinned = false
    const isDeleted = false
    const payload = {
      id,
      uid,
      threadId,
      content,
      index,
      handlename,
      isPinned,
      isDeleted,
      report: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    try {
      commit('setComments', [
        ...comments,
        { ...payload },
      ])
      await setDoc(docRef, payload)
      await updateDoc(doc(collection(db, 'threads'), threadId), {
        commentsCount: index,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error(error)
    }
  },
  setComments({ commit }, commentsSnap) {
    if (commentsSnap) {
      let comments = []
      commentsSnap.forEach(doc => {
        const data = doc.data({ serverTimestamps: "estimate" })
        const createdAt = data.createdAt.toDate()
        comments = [
          ...comments,
          {
            ...data,
            createdAt
          }
        ]
      })
      commit('setComments', comments)
      return comments
    }
  },
  async getComments({ dispatch }, threadId) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('threadId', '==', threadId), orderBy('index'))
    const querySnapshot = await getDocs(q)
    const comments = dispatch('setComments', querySnapshot)
    return comments
  },
  watchComments({ dispatch }, threadId) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('threadId', '==', threadId), orderBy('index'))
    onSnapshot(q, querySnapshot => {
      dispatch('setComments', querySnapshot)
    })
  },
  async deleteComment(context, id) {
    const collectionRef = collection(db, 'comments')
    const docRef = doc(collectionRef, id)
    await updateDoc(docRef, {
      isDeleted: true,
      updatedAt: serverTimestamp()
    })
  },
  async deleteComments({ commit }, threadId) {
    const collectionRef = collection(db, 'comments')
    const q = query(collectionRef, where('threadId', '==', threadId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async doc => {
      const docRef = doc.ref
      await deleteDoc(docRef)
    })
    commit('resetComments')
  },
  async switchCommentReport({ getters, rootGetters }, commentId) {
    const comment = getters.commentWithId(commentId);
    const uid = rootGetters['user/uid'];
    const isReported = getters.commentIsReported(commentId);
    let report;
    if (isReported) {
      report = comment.report.filter(id => id !== uid);
    } else {
      report = [...comment.report, uid];
    }
    const collectionRef = collection(db, 'comments');
    const docRef = doc(collectionRef, commentId);
    await updateDoc(docRef, {
      report,
      updatedAt: serverTimestamp(),
    });
  },
};