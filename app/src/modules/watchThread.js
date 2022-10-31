import { db } from '@/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

export async function watchThread(threadId, callback) {
  const docRef = doc(collection(db, 'threads'), threadId);
  try {
    const unsubscribe = await onSnapshot(docRef, (doc) => {
      const comments = doc.data().comments.sort((a, b) => {
        return a.createdAt > b.createdAt ? 1 : -1;
      });
      const thread = {
        ...doc.data(),
        comments,
      };
      callback(thread);
    });
    return unsubscribe;
  } catch (e) {
    console.error(e);
  }
}
