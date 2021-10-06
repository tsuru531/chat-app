import Router from '@/router'
import { auth, db, firebaseTimestamp } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const user = {
  namespaced: true,
  state: {
    isSignedIn: false
  },
  getters: {
    isSignedIn: state => state.isSignedIn
  },
  mutations: {
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
    }
  },
  modules: {
  }
};