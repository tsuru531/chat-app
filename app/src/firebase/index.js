import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = firebase.firestore();
export const firebaseTimestamp = firebase.firestore.Timestamp;