import { db } from '@/firebase';
import { collection, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

export async function createReport(threadId, index, uid) {
  if (
    typeof threadId !== 'string' ||
    typeof index !== 'number' ||
    typeof uid !== 'string'
  ) {
    console.error('Type error.');
    return false;
  }
  const docRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const payload = { reports: arrayUnion(uid), updatedAt: serverTimestamp() };
  try {
    await updateDoc(docRef, payload);
  } catch (e) {
    console.error(e);
  }
}
