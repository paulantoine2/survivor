const io = require('socket.io')(3000);

async function run() {
  io.on('connection', (socket) => {
    socket.on('joinGame', require('./listeners/onJoinGame'));
    socket.on('test', require('./listeners/onTest'));
  });
}

run().catch((error) => console.error(error.stack));
