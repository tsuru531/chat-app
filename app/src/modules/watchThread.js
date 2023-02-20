import { db } from '@/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

export async function watchThread(threadId, callback) {
  const docRef = doc(collection(db, 'threads'), threadId);
  try {
    const unsubscribe = await onSnapshot(docRef, (doc) => {
      const thread = doc.data();
      callback(thread);
    });
    return unsubscribe;
  } catch (e) {
    console.error(e);
  }
}
