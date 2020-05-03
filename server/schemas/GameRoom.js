const { Schema } = require('mongoose');
const Player = require('./Player');
const Message = require('./Message');
const Team = require('./Team');

module.exports = new Schema({
  players: [Player],
  messages: [Message],
  teams: [Team],
  createdAt: { type: Date, default: Date.now },
});
