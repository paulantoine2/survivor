const mongoose = require('mongoose');

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
  Player: mongoose.model('Player', require('./schemas/Player')),
  GameRoom: mongoose.model('GameRoom', require('./schemas/GameRoom')),
  Message: mongoose.model('Message', require('./schemas/Message')),
};
