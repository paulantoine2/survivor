const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database.ref('/status/{roomId}/{userId}').onUpdate(async (change, context) => {
  // Get the data written to Realtime Database
  const eventStatus = change.after.val();
  const { userId, roomId } = context.params;

  // Then use other event data to create a reference to the
  // corresponding Firestore document.
  const userStatusFirestoreRef = firestore.collection('gameRoom').doc(roomId).collection('players').doc(userId);

  // It is likely that the Realtime Database change that triggered
  // this event has already been overwritten by a fast change in
  // online / offline status, so we'll re-read the current data
  // and compare the timestamps.
  const statusSnapshot = await change.after.ref.once('value');
  const status = statusSnapshot.val();

  // If the current timestamp for this data is newer than
  // the data that triggered this event, we exit this function.
  if (status.last_changed > eventStatus.last_changed) {
    return null;
  }

  // Otherwise, we convert the last_changed field to a Date
  eventStatus.last_changed = new Date(eventStatus.last_changed);

  // ... and write it to Firestore.
  return userStatusFirestoreRef.update(eventStatus);
});

// exports.onUsersReady = functions.firestore.document('gameRoom/{roomId}/players/{userId}').onUpdate(async (change, context) => {
//   const { roomId } = context.params;
//   const players = await change.after.ref.parent.get();

//   let players_ready = true;
//   players.forEach((player) => {
//     if (!player.data().ready) players_ready = false;
//   });
//   if (!players_ready) return null;
//   return firestore.collection('gameRoom').doc(roomId).update({
//     sceneType: 'VOTING',
//   });
// });
