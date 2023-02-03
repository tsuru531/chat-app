import { db } from '@/firebase';
import { writeBatch, collection, doc, arrayUnion, serverTimestamp } from 'firebase/firestore';

export async function createReport(threadId, index, uid, body) {
  if (
    typeof threadId !== 'string' ||
    typeof index !== 'number' ||
    typeof uid !== 'string' ||
    typeof body !== 'string'
  ) {
    console.error('Type error.');
    return false;
  }
  const batch = writeBatch(db);
  const commentsRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const reportsRef = doc(collection(db, 'threads', threadId, 'comments', String(index), 'reports'), uid);
  batch.update(commentsRef, { reports: arrayUnion(uid), updatedAt: serverTimestamp() });
  batch.set(reportsRef, { threadId, index, uid, body });
  try {
    await batch.commit();
  } catch (e) {
    console.error(e);
  }
}
