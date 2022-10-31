import { db } from '@/firebase';
import {
  collection,
  doc,
  runTransaction,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';

export async function addReport(threadId, commentId, uid) {
  const timestamp = Timestamp.fromDate(new Date());
  const threadRef = doc(collection(db, 'threads'), threadId);
  const commentRef = doc(collection(db, 'threads', threadId, 'comments'), commentId);
  try {
    await runTransaction(db, async (transaction) => {
      const commentDoc = await transaction.get(commentRef);
      if (!commentDoc.exists()) throw "Documant does not exist.";
      const newReports = [...commentDoc.data().reports, uid];
      const payload = { reports: newReports, updatedAt: timestamp };
      await transaction.update(commentRef, payload);
      await transaction.update(threadRef, { comments: arrayRemove(commentDoc.data()) });
      await transaction.update(threadRef, { comments: arrayUnion({
        ...commentDoc.data(),
        ...payload,
      })});
    });
  } catch (e) {
    console.error(e);
  }
}
