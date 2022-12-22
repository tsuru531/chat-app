import { db } from '@/firebase';
import { collection, doc, deleteDoc } from 'firebase/firestore';

export async function deleteThread(threadId) {
  const collectionRef = collection(db, 'threads');
  const docRef = doc(collectionRef, threadId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}
