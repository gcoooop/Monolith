const WaveUtil = require("./wave_util");

const Wave3 = (game) => {
  const defWave = WaveUtil.defWave(game);
  defWave(10, "Spider", 500);
};

module.exports = Wave3;