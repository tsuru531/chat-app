import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export async function watchComments(threadId, callback) {
  const collectionRef = collection(db, 'threads', threadId, 'comments');
  const q = query(collectionRef, orderBy('index', 'desc'));
  try {
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach(doc => list = [...list, doc.data()]);
      callback(list);
    });
    return unsubscribe;
  } catch (e) {
    console.error(e);
  }
}
