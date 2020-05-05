const { GameRoom } = require('../mongoose');

module.exports = async function gameRoom(namespace, socket) {
  let roomId = null;

  socket.on('connect', (id) => {
    roomId = id;
    socket.join(`gr_${id}`);
  });
};
