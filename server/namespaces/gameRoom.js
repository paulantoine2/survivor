const { GameRoom, Message } = require('../mongoose');

module.exports = function gameRoom(namespace, socket) {
  let gameRoom = null;
  let player = null;

  // Quand le client se connecte
  socket.on('arriving', async ({ roomId, playerId }) => {
    socket.join(roomId);
    gameRoom = await GameRoom.findById(roomId);
    player = await gameRoom.players.id(playerId);
    player.online = true;
    await gameRoom.save();
    loadPlayers();
    loadMessages();
  });

  // Quand le client se deconnecte
  socket.on('disconnect', async (reason) => {
    if (!player) return;
    player.online = false;
    player.ready = false;
    await gameRoom.save();
    loadPlayers();
  });

  // Quand le client change son statut "Prêt"
  socket.on('changeReady', async (status) => {
    if (!player) return;
    player.ready = status;
    await gameRoom.save();
    loadPlayers();
  });

  // Quand le client envoie un message
  socket.on('sendMessage', async (content) => {
    const message = new Message({
      content,
      type: 'message',
      senderId: player._id,
    });
    gameRoom.messages.push(message);
    await gameRoom.save();
    loadMessages();
  });

  function loadPlayers() {
    namespace.in(gameRoom._id).emit('loadPlayers', gameRoom.players);
  }
  function loadMessages() {
    const formated = gameRoom.toObject().messages.map((m) => ({
      type: m.type,
      content: m.content,
      user: gameRoom.players.id(m.senderId).toObject(),
    }));
    namespace.in(gameRoom._id).emit('loadMessages', formated);
  }
};
