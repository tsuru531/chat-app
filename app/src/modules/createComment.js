import { db } from '@/firebase';
import { collection, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function createComment(commentData) {
  const collectionRef = collection(db, 'comments');
  const docRef = doc(collectionRef);
  const payload = {
    id: docRef.id,
    ...commentData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  try {
    await setDoc(docRef, payload);
    await updateDoc(doc(collection(db, 'threads'), commentData.threadId), {
      commentsCount: commentData.index,
      updatedAt: serverTimestamp()
    })
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export default createComment;
