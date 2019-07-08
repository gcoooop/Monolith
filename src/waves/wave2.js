const WaveUtil = require("./wave_util");

const Wave1 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(1, "Caveman", 10);
  defWave(1, "Eagle", 10);
  defWave(1, "Spider", 10);
  defWave(1, "Mammoth", 10);
};

module.exports = Wave1;