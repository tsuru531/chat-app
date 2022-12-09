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
      let commentsCount;
      if (commentsDoc.exists()) {
        commentsCount = commentsDoc.list.length + 1;
      } else {
        commentsCount = 1;
      }
      const payload = {
        list: arrayUnion({
          index: commentsCount,
          uid,
          threadId,
          handlename,
          body,
          createdAt: timestamp,
        }),
      };
      await transaction.set(commentsRef, payload);
      await transaction.update(threadRef, { commentsCount, updatedAt: timestamp });
    });
  } catch (e) {
    console.error(e);
  }
}
