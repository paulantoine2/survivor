const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ConnectMongo } = require('./mongoose');

ConnectMongo();

const whitelist = ['http://localhost:4000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
};

server.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/user', require('./routes/user'));

async function run() {
  const lobby = io.of('lobby');
  const game = io.of('game');

  lobby.on('connection', (socket) => require('./namespaces/lobby')(lobby, socket));
  game.on('connection', (socket) => require('./namespaces/gameRoom')(game, socket));
}

run().catch((error) => console.error(error.stack));
