import { db } from '@/firebase';
import { writeBatch, collection, doc, arrayRemove, serverTimestamp } from 'firebase/firestore';

export async function deleteReport(threadId, index, uid) {
  if (
    typeof threadId !== 'string' ||
    typeof index !== 'number' ||
    typeof uid !== 'string'
  ) {
    console.error('Type error.');
    return false;
  }
  const batch = writeBatch(db);
  const commentsRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
  const reportsRef = doc(collection(db, 'threads', threadId, 'comments', String(index), 'reports'), uid);
  batch.update(commentsRef, { reports: arrayRemove(uid), updatedAt: serverTimestamp() });
  batch.delete(reportsRef);
  try {
    await batch.commit();
  } catch (e) {
    console.error(e);
  }
}
