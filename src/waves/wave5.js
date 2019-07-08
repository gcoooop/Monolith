const WaveUtil = require("./wave_util");

const Wave5 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(6, "Caveman", 750);
  defWave(20, "Spider", 750);
  defWave(6, "Eagle", 750);
  defWave(1, "Mammoth", 1000)
};

module.exports = Wave5;