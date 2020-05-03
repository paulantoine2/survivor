const { Player } = require('../mongoose');

module.exports = async function onJoinGame(data) {
  const p = new Player({
    userName: data.userName,
    stats: {
      strength: data.strength,
      agility: data.agility,
      swim: data.swim,
      survival: data.survival,
    },
  });
  await p.save();
};
