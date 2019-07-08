const WaveUtil = require("./wave_util");

const Wave4 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(6, "Caveman", 750);
  defWave(5, "Eagle", 750);
};

module.exports = Wave4;