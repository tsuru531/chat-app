import { db } from '@/firebase';
import {
  runTransaction,
  doc,
  collection,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';

export async function deleteReport(threadId, commentId, uid) {
  const timestamp = Timestamp.fromDate(new Date());
  const threadRef = doc(collection(db, 'threads'), threadId);
  const commentRef = doc(collection(db, 'threads', threadId, 'comments'), commentId);
  try {
    await runTransaction(db, async (transaction) => {
      const commentDoc = await transaction.get(commentRef);
      if (!commentDoc.exists()) throw "Document does not exist.";
      const newReports = commentDoc.data().reports.filter(id => id !== uid);
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
