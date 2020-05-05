const mongoose = require('mongoose');
const PlayerSchema = require('./schemas/Player');
const GameRoomSchema = require('./schemas/GameRoom');

mongoose.connect('mongodb://localhost:27017/survivor', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log('Mongo connected');
  },
  (err) => {
    console.error(err);
  }
);

module.exports = {
  mongoose,
  Player: mongoose.model('Player', PlayerSchema),
  GameRoom: mongoose.model('GameRoom', GameRoomSchema),
};
