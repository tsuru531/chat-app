import Router from '@/router';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { createThread, createComment, deleteThread } from '@/modules';

export const actions = {
  async createThread({ commit, dispatch, rootGetters }, { title, comment, topic, gender, age, place, showId, characterLimit, limitCount }) {
    const uid = rootGetters['user/uid'];
    const handlename = '';
    const commentsCount = 0;
    const threadData = { uid, title, topic, gender, age, place, showId, characterLimit, limitCount, commentsCount };
    try {
      const payload = await createThread(threadData);
      commit('setThread', payload);
      await dispatch('addComment', {
        threadId: payload.id,
        handlename,
        content: comment,
      });
      dispatch('threads/add', payload, { root: true });
      Router.push(`/thread/${payload.id}`);
    } catch (error) {
      console.error(error);
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
  async delete({ commit }, threadId) {
    await deleteThread(threadId);
    commit('resetThread');
    commit('resetComments');
    commit('threads/delete', threadId, { root: true });
    Router.push('/');
  },
  async addComment({ commit, dispatch, rootGetters }, { threadId, handlename, content }) {
    if (!handlename) handlename = '名無しさん';
    const uid = rootGetters['user/uid'];
    const comments = await dispatch('getComments', threadId);
    let lastComment;
    if (comments[0]) {
      lastComment = comments.slice(-1)[0]
    } else {
      lastComment = { index: 0 }
    }
    const index = lastComment.index + 1;
    const isPinned = false;
    const isDeleted = false;
    const commentData = { uid, threadId, content, index, handlename, isPinned, isDeleted, report: [] };
    try {
      const payload = await createComment(commentData);
      commit('setComments', [
        ...comments,
        { ...payload },
      ])
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