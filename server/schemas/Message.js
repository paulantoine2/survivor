const { Schema } = require('mongoose');

module.exports = new Schema({
  content: String,
  type: String,
  timeStamp: { type: Date, default: Date.now },
  senderId: Schema.Types.ObjectId,
  playerId: Schema.Types.ObjectId,
});
