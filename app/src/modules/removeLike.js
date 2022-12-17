import { db } from '@/firebase';
import {
  collection,
  doc,
  updateDoc,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';

export async function removeLike (threadId, index, uid) {
  const docRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const payload = { likes: arrayRemove(uid), updatedAt: serverTimestamp() };
  try {
    await updateDoc(docRef, payload);
  } catch (e) {
    console.error(e);
  }
}
