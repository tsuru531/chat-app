import { db } from '@/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

export async function watchComments(threadId, callback) {
  const docRef = doc(collection(db, 'threads', threadId, 'comments'), '0');
  try {
    const unsubscribe = await onSnapshot(docRef, (doc) => {
      const data = doc.data();
      const comments = data.list;
      callback(comments);
    });
    return unsubscribe;
  } catch (e) {
    console.error(e);
  }
}
