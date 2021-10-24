import Router from '@/router'
import { auth, db } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore'

export const actions = {
  async signUp({ commit }, { name, email, password }) {
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
      commit('signIn', {
        uid,
        name
      })
      Router.push('/')
    } catch (error) {
      console.error(error)
    }
  },
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  },
  async signInByTwitter() {
    const provider = new TwitterAuthProvider()
    await signInWithRedirect(auth, provider)
  },
  async snsSignUp({ commit }) {
    const result = await getRedirectResult(auth)
    if (result) {
      const user = result.user
      const uid = user.uid
      const userInfo = user.providerData[0]
      const name = userInfo.displayName
      const payload = {
        uid,
        email: '',
        name,
        created_at: serverTimestamp()
      }
      const collectionRef = collection(db, 'users')
      const docRef = doc(collectionRef, uid)
      await setDoc(docRef, payload)
      commit('signIn', {
        uid,
        name
      })
      Router.push('/')
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
  },
  checkEmailVerified({ commit, getters }) {
    const isEmailVerified = getters['isEmailVerified']
    if (isEmailVerified) return true
    onAuthStateChanged(auth, async user => {
      if (!user) return false
      const uid = user.uid
      const emailVerified = user.emailVerified
      const providerData = user.providerData
      const isSignedIn = getters['isSignedIn']
      if (!isSignedIn) {
        const collectionRef = collection(db, 'users')
        const docRef = doc(collectionRef, uid)
        const docSnapshot = await getDoc(docRef)
        const data = docSnapshot.data()
        commit('signIn', {
          uid,
          name: data.name
        })
      }
      if (emailVerified || providerData.length) {
        commit('emailVerification')
        return true
      } else {
        return false
      }
    })
  }
}