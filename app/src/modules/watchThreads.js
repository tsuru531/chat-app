import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export async function watchThreads(callback) {
  const collectionRef = collection(db, 'threads');
  const q = query(collectionRef, orderBy('updatedAt', 'desc'));
  try {
    const unsubscribe = await onSnapshot(q, (snapshot) => {
      let threads = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        threads = [
          ...threads,
          data,
        ];
      });
      callback(threads);
    });
    return unsubscribe;
  } catch (error) {
    console.error(error);
  }
}

export default watchThreads;
