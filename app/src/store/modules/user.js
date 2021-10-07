import Router from '@/router'
import { auth, db, firebaseTimestamp } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const user = {
  namespaced: true,
  state: {
    isSignedIn: false,
    uid: '',
    name: ''
  },
  getters: {
    isSignedIn: state => state.isSignedIn,
    name: state => state.name
  },
  mutations: {
    signIn(state, { uid, name }) {
      state.isSignedIn = true
      state.uid = uid
      state.name = name
    },
    signOut(state) {
      state.isSignedIn = false
      state.uid = ''
      state.name = ''
    }
  },
  actions: {
    async signUp(context, { name, email, password }) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (!user) return false
      const uid = user.uid
      const timestamp = firebaseTimestamp.now()
      const data = {
        created_at: timestamp,
        uid,
        email,
        name
      }
      await db.collection('users').doc(uid).set(data)
      .then(
        Router.push('/signin')
      )
    },
    async signIn({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (!user) return false
      const uid = user.uid
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()
      commit('signIn', {
        uid,
        name: data.name
      })
      Router.push('/')
    },
    signOut({ commit }) {
      signOut(auth).then(() => {
        commit('signOut')
        Router.push('/', () => {})
      })
    }
  },
  modules: {
  }
};