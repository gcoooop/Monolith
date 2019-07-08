const WaveUtil = require("./wave_util");

const Wave2 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(2, "Caveman", 250, 2);
  defWave(2, "Caveman", 250, 3);
  defWave(2, "Caveman", 250, 4);
};

module.exports = Wave2;