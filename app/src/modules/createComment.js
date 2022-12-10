import { db } from '@/firebase';
import { collection, doc, runTransaction, arrayUnion, Timestamp } from 'firebase/firestore';

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
  const commentsRef = doc(collection(db, 'threads', threadId, 'comments'), '0');
  try {
    await runTransaction(db, async (transaction) => {
      const commentsDoc = await transaction.get(commentsRef);
      const data = {
        uid,
        threadId,
        handlename,
        body,
        createdAt: timestamp,
      };
      let commentsCount;
      if (commentsDoc.exists()) {
        commentsCount = commentsDoc.data().list.length + 1;
        await transaction.update(commentsRef, { list: arrayUnion({ ...data, index: commentsCount }) });
      } else {
        commentsCount = 1;
        await transaction.set(commentsRef, { list: { ...data, index: commentsCount } });
      }
      await transaction.update(threadRef, { commentsCount, updatedAt: timestamp });
    });
  } catch (e) {
    console.error(e);
  }
}
