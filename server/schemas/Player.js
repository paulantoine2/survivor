const { Schema } = require('mongoose');

module.exports = new Schema({
  userName: String,
  avatarUrl: String,
  online: { type: Boolean, default: false },
  ready: { type: Boolean, default: false },
  stats: {
    agility: { type: Number, min: 0, max: 4 },
    strength: { type: Number, min: 0, max: 4 },
    force: { type: Number, min: 0, max: 4 },
    survival: { type: Number, min: 0, max: 4 },
    swim: { type: Number, min: 0, max: 4 },
    energy: { type: Number, min: 0, max: 10, default: 10 },
    soloWins: { type: Number, default: 0 },
    teamWins: { type: Number, default: 0 },
  },
  immunity: { type: Boolean, default: false },
  teamId: Schema.Types.ObjectId,
});
