import { db } from '@/firebase';
import { writeBatch, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';

async function getCommentsCount(threadId) {
  const docRef = doc(collection(db, 'threads'), threadId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().commentsCount;
    } else {
      throw 'No such document.';
    }
  } catch (e) {
    console.error(e);
  }
}

export async function deleteComments(threadId) {
  if (
    typeof threadId !== 'string'
  ) {
    console.error('Type error.');
    return false;
  }
  const commentsCount = await getCommentsCount(threadId);
  const batch = writeBatch(db);
  for (let index = 1; index < commentsCount + 1; index++) {
    const commentRef = doc(collection(db, 'threads', threadId, 'comments'), String(index));
    batch.delete(commentRef);
  }
  const threadRef = doc(collection(db, 'threads'), threadId);
  const payload = { commentsCount: 0, updatedAt: serverTimestamp() };
  batch.update(threadRef, payload);
  try {
    await batch.commit();
  } catch (e) {
    console.error(e);
  }
}
