const { Schema } = require('mongoose');

module.exports = new Schema({
  color: String,
  immunity: { type: Boolean, default: false },
  tools: {
    fire: { type: Boolean, default: false },
    home: { type: Boolean, default: false },
    rice: { type: Boolean, default: false },
    harpoon: { type: Boolean, default: false },
  },
  stats: {
    comfortWins: { type: Number, default: 0 },
    immunityWins: { type: Number, default: 0 },
  },
});
