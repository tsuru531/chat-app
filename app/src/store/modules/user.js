import Router from '@/router'
import { auth, db, firebaseTimestamp } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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
    }
  },
  actions: {
    signUp(context, { name, email, password }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user
          if (user) {
            const uid = user.uid
            const timestamp = firebaseTimestamp.now()
            const data = {
              created_at: timestamp,
              uid,
              email,
              name
            };
            db.collection('users').doc(uid).set(data)
              .then(() => {
                Router.push('/signin')
              })
          }
        })
    },
    signIn({ commit }, { email, password }) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user
          if (!user) return false
          const uid = user.uid
          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()
              commit('signIn', {
                uid,
                name: data.name
              })
              Router.push('/')
            })
        })
    }
  },
  modules: {
  }
};