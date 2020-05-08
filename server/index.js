const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

async function run() {
  console.log(`Socket.IO running on ${PORT}`);
  // require('./mongoose');

  const lobby = io.of('lobby');
  const game = io.of('game');

  lobby.on('connection', (socket) => require('./namespaces/lobby')(lobby, socket));
  game.on('connection', (socket) => require('./namespaces/gameRoom')(game, socket));
}

run().catch((error) => console.error(error.stack));
