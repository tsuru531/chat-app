import { db } from '@/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export async function getReports(threadId, index) {
  const q = query(collection(db, 'threads', threadId, 'comments', String(index), 'reports'));
  try {
    const snapshot = await getDocs(q);
    let reports = [];
    snapshot.forEach(doc => {
      reports = [...reports, doc.data()];
    });
    return reports;
  } catch (e) {
    console.error(e);
  }
}
