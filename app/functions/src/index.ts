import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

admin.initializeApp();
const env = functions.config();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const threadsIndex = client.initIndex("threads");

exports.indexThread = functions.firestore
    .document("threads/{docId}")
    .onCreate((snap) => {
      const data = snap.data();
      const objectID = snap.id;
      return threadsIndex.saveObject({
        objectID,
        ...data,
      });
    });
exports.updateThread = functions.firestore
    .document("threads/{docId}")
    .onUpdate((snap) => {
      const data = snap.after.data();
      const objectID = snap.after.id;
      return threadsIndex.partialUpdateObject({
        objectID,
        ...data,
      });
    });
exports.unindexThread = functions.firestore
    .document("threads/{docId}")
    .onDelete((snap) => {
      const objectID = snap.id;
      return threadsIndex.deleteObject(objectID);
    });
