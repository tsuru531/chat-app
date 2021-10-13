import Router from '@/router'
import { auth, db } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore'

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
      const payload = {
        uid,
        email,
        name,
        created_at: serverTimestamp()
      }
      const collectionRef = collection(db, 'users')
      const docRef = doc(collectionRef, uid)
      try {
        await setDoc(docRef, payload)
        await sendEmailVerification(user)
        Router.push('/signin')
        return userCredential
      } catch (error) {
        console.error(error)
      }
    },
    async signIn({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (!user) return false
      const uid = user.uid
      const collectionRef = collection(db, 'users')
      const docRef = doc(collectionRef, uid)
      const docSnapshot = await getDoc(docRef)
      const data = docSnapshot.data()
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