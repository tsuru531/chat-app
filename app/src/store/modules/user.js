import Router from '@/router'
import { auth, db, firebaseTimestamp } from '@/firebase'

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
      auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          const user = result.user

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