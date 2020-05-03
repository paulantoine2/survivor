const mongoose = require('mongoose');
const PlayerSchema = require('./schemas/Player');

mongoose.connect('mongodb://localhost:27017/survivor', { useNewUrlParser: true }, (err) => {
  console.log('Mongo connected');
});

module.exports = {
  mongoose,
  Player: mongoose.model('Player', PlayerSchema),
};
