const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

async function run() {
  console.log(`Socket.IO running on ${PORT}`);

  const lobby = io.of('lobby').on('connection', (socket) => require('./namespaces/lobby')(lobby, socket));
  const game = io.of('game').on('connection', (socket) => require('./namespaces/gameRoom')(game, socket));
}

run().catch((error) => console.error(error.stack));
