import { db } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function createThread(threadData) {
  const collectionRef = collection(db, 'threads');
  const docRef = doc(collectionRef);
  const payload = {
    id: docRef.id,
    ...threadData,
    comments: [],
    createdAt: serverTimestamp(),
  };
  try {
    await setDoc(docRef, payload);
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export default createThread;
