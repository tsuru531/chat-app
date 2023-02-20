import { db } from '@/firebase';
import { collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function removeComment(threadId, index) {
  const docRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const payload = { deletedAt: serverTimestamp() };
  try {
    await updateDoc(docRef, payload);
  } catch (e) {
    console.error(e);
  }
}
