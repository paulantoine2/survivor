import { firestore } from 'firebase/app';
import { db } from '../../services/firebase';
import { turnOffPresence } from '../presence';

export async function quitGameRoom(roomId, userId) {
  const removePlayer = db.collection('gameRoom').doc(roomId).collection('players').doc(userId).delete();
  const updateRoom = db
    .collection('gameRoom')
    .doc(roomId)
    .update({
      playerCount: firestore.FieldValue.increment(-1),
    });
  await turnOffPresence();
  Promise.all([removePlayer, updateRoom]);
}

export async function joinGameRoom(roomId, userId, username) {
  const addPlayer = db.collection('gameRoom').doc(roomId).collection('players').doc(userId).set({
    userId,
    username,
    team: 'TODO',
    ready: false,
  });
  const updateRoom = db
    .collection('gameRoom')
    .doc(roomId)
    .update({
      playerCount: firestore.FieldValue.increment(1),
    });
  Promise.all([addPlayer, updateRoom]);
}

export async function updatePlayer(roomId, userId, data) {
  await db.collection('gameRoom').doc(roomId).collection('players').doc(userId).update(data);
}

export async function sendMessage(roomId, senderId, message) {
  await db
    .collection('gameRoom')
    .doc(roomId)
    .collection('messages')
    .doc()
    .set({
      message,
      senderId,
      timestamp: firestore.FieldValue.serverTimestamp(),
      messageType: 'TEXT',
    })
    .catch((error) => {
      console.error('Message cannot be sent : ', error);
    });
}

export async function fetchRooms() {
  let rooms = [];
  await db
    .collection('gameRoom')
    .get()
    .then(async (snapshot) => {
      let refs = [];
      snapshot.forEach((doc) => {
        refs.push(
          doc.ref
            .collection('players')
            .get()
            .then((players) => {
              rooms.push({
                id: doc.id,
                players: players.size,
              });
            })
        );
      });
      await Promise.all(refs);
    });
  return rooms;
}

export function subscribePlayers(roomId, callback) {
  db.collection('gameRoom')
    .doc(roomId)
    .collection('players')
    .onSnapshot((res) => {
      let players = [];
      res.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
      });
      callback(players);
    });
}

export function subscribeMessages(roomId, callback) {
  db.collection('gameRoom')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp')
    .onSnapshot((res) => {
      let messages = [];
      res.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      callback(messages);
    });
}

export function subscribeGameroom(roomId, callback) {
  db.collection('gameRoom')
    .doc(roomId)
    .onSnapshot((gameRoom) => {
      callback(gameRoom.data());
    });
}

export function subscribePlayer(roomId, userId, callback) {
  db.collection('gameRoom')
    .doc(roomId)
    .collection('players')
    .doc(userId)
    .onSnapshot((user) => {
      callback(user.data());
    });
}

export async function getCurrentRoom(userId) {
  const current_player = await db.collectionGroup('players').where('userId', '==', userId).get();
  if (!current_player.size) return null;
  let roomId = null;
  current_player.forEach((doc) => {
    roomId = doc.ref.parent.parent.id;
  });
  return roomId;
}
