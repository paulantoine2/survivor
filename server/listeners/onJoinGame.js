const { Player } = require('../mongoose');

module.exports = async function onJoinGame(data) {
  await Player.create({
    userName: data.userName,
    stats: {
      strength: data.strength,
      agility: data.agility,
      swim: data.swim,
      survival: data.survival,
    },
  });
  console.log(`${data.userName} joined the game !`);
};
