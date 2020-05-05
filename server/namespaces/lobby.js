const { GameRoom } = require('../mongoose');
module.exports = async function lobby(namespace, socket) {
  socket.on('joinGame', (data, callback) => require('../listeners/onJoinGame')(data, callback, namespace));

  const gameRooms = await GameRoom.find({});
  socket.emit('load', gameRooms);
};
