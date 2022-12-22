import { db } from '@/firebase';
import { collection, doc, runTransaction, Timestamp } from 'firebase/firestore';

export async function createComment(threadId, uid, handlename, body) {
  if (
    typeof threadId !== 'string' ||
    typeof uid !== 'string' ||
    typeof handlename !== 'string' ||
    typeof body !== 'string'
  ) {
    console.error('Type error.');
    return false;
  }
  const timestamp = Timestamp.fromDate(new Date());
  const threadRef = doc(collection(db, 'threads'), threadId)
  try {
    await runTransaction(db, async (transaction) => {
      const threadDoc = await transaction.get(threadRef);
      const data = {
        uid,
        threadId,
        handlename,
        body,
        createdAt: timestamp,
      };
      const commentsCount = threadDoc.data().commentsCount ? threadDoc.data().commentsCount + 1 : 1;
      const commentsRef = doc(collection(db, 'threads', threadId, 'comments'), String(commentsCount));
      await transaction.set(commentsRef, { ...data, index: commentsCount });
      await transaction.update(threadRef, { commentsCount, updatedAt: timestamp });
    });
  } catch (e) {
    console.error(e);
  }
}
