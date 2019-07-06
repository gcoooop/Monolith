const WaveUtil = require("./wave_util");

const Wave1 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(4, "Caveman", 10);
  defWave(2, "Eagle", 10);
};

module.exports = Wave1;