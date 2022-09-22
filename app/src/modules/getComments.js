import { db } from '@/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export async function getComments(threadId) {
  const collectionRef = collection(db, 'comments');
  const q = query(collectionRef, where('threadId', '==', threadId), orderBy('index'));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}
