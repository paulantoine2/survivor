import { auth, rt, db } from '../services/firebase';
import { database, firestore } from 'firebase/app';

export async function turnOnPresence(roomId) {
  if (!auth.currentUser) return;
  if (!roomId) return;
  const userId = auth.currentUser.uid;
  const userStatusDatabaseRef = rt.ref(`/status/${roomId}/${userId}`);
  const userStatusFirestoreRef = db.collection('gameRoom').doc(roomId).collection('players').doc(userId);
  const isOfflineForDatabase = {
    status: 'offline',
    last_changed: database.ServerValue.TIMESTAMP,
  };
  const isOnlineForDatabase = {
    status: 'online',
    last_changed: database.ServerValue.TIMESTAMP,
  };
  const isOfflineForFirestore = {
    status: 'offline',
    last_changed: firestore.FieldValue.serverTimestamp(),
  };
  const isOnlineForFirestore = {
    status: 'online',
    last_changed: firestore.FieldValue.serverTimestamp(),
  };

  return rt.ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val() === false) return userStatusFirestoreRef.update(isOfflineForFirestore);

    return userStatusDatabaseRef
      .onDisconnect()
      .set(isOfflineForDatabase)
      .then(() => {
        userStatusDatabaseRef.set(isOnlineForDatabase);
        return userStatusFirestoreRef.update(isOnlineForFirestore);
      });
  });
}

export async function turnOffPresence(roomId) {
  if (!auth.currentUser) return;
  if (!roomId) return;
  const userId = auth.currentUser.uid;
  const userStatusDatabaseRef = rt.ref(`/status/${roomId}/${userId}`);
  await rt.ref('.info/connected').off();
  await userStatusDatabaseRef.onDisconnect().cancel();
  return userStatusDatabaseRef.remove();
}
