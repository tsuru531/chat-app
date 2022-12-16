import { db } from '@/firebase';
import { collection, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

export async function addLike(threadId, index, uid) {
  const docRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const payload = { likes: arrayUnion(uid), updatedAt: serverTimestamp() };
  try {
    await updateDoc(docRef, payload);
  } catch (e) {
    console.error(e);
  }
}
