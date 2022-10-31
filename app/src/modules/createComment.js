import { db } from '@/firebase';
import { writeBatch, collection, doc, arrayUnion, Timestamp } from 'firebase/firestore';

export async function createComment(threadId, uid, handlename, content) {
  const batch = writeBatch(db);
  const timestamp = Timestamp.fromDate(new Date());
  const commentRef = doc(collection(db, 'threads', threadId, 'comments'));
  const threadRef = doc(collection(db, 'threads'), threadId);
  const id = commentRef.id;
  const payload = {
    id,
    threadId,
    uid,
    handlename,
    content,
    likes: [],
    reports: [],
    createdAt: timestamp,
  };
  batch.set(commentRef, payload);
  batch.update(threadRef, {
    comments: arrayUnion(payload),
    updatedAt: timestamp,
  });
  try {
    await batch.commit();
  } catch (e) {
    console.error(e);
  }
}
