const mongoose = require('mongoose');

const MONGOURI = 'mongodb://localhost:27017/survivor';

const ConnectMongo = async () => {
  try {
    await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo connected');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  ConnectMongo,
  Player: mongoose.model('Player', require('./schemas/Player')),
  GameRoom: mongoose.model('GameRoom', require('./schemas/GameRoom')),
  Message: mongoose.model('Message', require('./schemas/Message')),
  User: mongoose.model('User', require('./schemas/User')),
};
