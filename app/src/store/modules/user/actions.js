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
  async signUp({ commit }, { uid, email, name }) {
    if (typeof uid !== 'string') return false;
    if (typeof email !== 'string') return false;
    if (typeof name !== 'string') return false;
    const role = 'general';
    const createdAt = serverTimestamp();
    const payload = { uid, email, name, role, createdAt };
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, uid);
    try {
      await setDoc(docRef, payload);
      commit('signIn', { uid, name, role });
    } catch (e) {
      console.error(e);
    }
  },
  async signUpWithEmailAndPassword({ dispatch }, { name, email, password }) {
    if (typeof name !== 'string') return false;
    if (typeof email !== 'string') return false;
    if (typeof password !== 'string') return false;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const uid = user.uid;
        await dispatch('signUp', { uid, email, name });
        await sendEmailVerification(user);
        Router.push('/', () => {});
      }
    } catch (e) {
      console.error(e);
    }
  },
  providerSignUp({ dispatch }) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const uid = user.uid;
          const userInfo = user.providerData[0];
          const name = userInfo.displayName;
          dispatch('signUp', { uid, email: '', name });
          Router.push('/', () => {});
        }
      }
    });
  },
  async signIn({ commit }, uid) {
    if (typeof uid !== 'string') return false;
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, uid);
    try {
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      const { name, role } = data;
      commit('signIn', { uid, name, role });
    } catch (e) {
      console.error(e);
    }
  },
  async signInWithEmailAndPassword({ dispatch }, { email, password }) {
    if (typeof email !== 'string') return false;
    if (typeof password !== 'string') return false;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        const uid = user.uid;
        dispatch('signIn', uid);
        Router.push('/', () => {});
      }
    } catch (e) {
      console.error(e);
    }
  },
  async providerSignIn({ dispatch }) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const uid = user.uid;
          dispatch('signIn', uid);
          Router.push('/', () => {});
        }
      }
    });
  },
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  },
  async signInByTwitter() {
    const provider = new TwitterAuthProvider()
    await signInWithRedirect(auth, provider)
  },
  signOut({ commit }) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await signOut(auth);
        commit('signOut');
        Router.push('/', () => {});
      }
    });
  },
  checkEmailVerified({ commit, dispatch, getters }) {
    const isEmailVerified = getters['isEmailVerified']
    if (isEmailVerified) return true
    onAuthStateChanged(auth, async user => {
      if (!user) return false
      const { uid, emailVerified, providerData } = user
      const isSignedIn = getters['isSignedIn']
      if (!isSignedIn) dispatch('signIn', uid)
      if (emailVerified || providerData.length) {
        commit('emailVerification')
        return true
      } else {
        return false
      }
    })
  }
}