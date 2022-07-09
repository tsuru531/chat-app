import { db } from '@/firebase';
import { collection, doc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

async function deleteComments(threadId) {
  const collectionRef = collection(db, 'comments');
  const q = query(collectionRef, where('threadId', '==', threadId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async doc => {
    const docRef = doc.ref;
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  });
}

export async function deleteThread(threadId) {
  const collectionRef = collection(db, 'threads');
  const docRef = doc(collectionRef, threadId);
  try {
    await deleteComments(threadId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

export default deleteThread;
