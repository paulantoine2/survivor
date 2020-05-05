const { Schema } = require('mongoose');
const Player = require('./Player');
const Message = require('./Message');
const Team = require('./Team');

module.exports = new Schema({
  players: { type: [Player], default: [] },
  messages: { type: [Message], default: [] },
  teams: { type: [Team], default: [] },
  createdAt: { type: Date, default: Date.now },
  open: { type: Boolean, default: true },
});
