const { Player, GameRoom } = require('../mongoose');

module.exports = async function onJoinGame(data, callback, namespace) {
  // Creer le joueur
  const player = await Player.create({
    userName: data.userName,
    stats: {
      strength: data.strength,
      agility: data.agility,
      swim: data.swim,
      survival: data.survival,
    },
  });
  const room = new GameRoom({ players: [player] });

  // Creer la room avec le joueur si c'est une nouvelle partie
  if (!data.roomId) await room.save();
  // Ajoute le joueur a la room rejointe
  else await GameRoom.updateOne({ _id: data.roomId }, { $push: { players: player } });

  callback(player._id, data.roomId || room._id);

  // Met a jour la liste des rooms sur les clients
  const gameRooms = await GameRoom.find({});
  namespace.emit('load', gameRooms);
};
