const WaveUtil = require("./wave_util");

const Wave1 = (game) => {
  game.add( new WaveUtil.Caveman({ path: WaveUtil.generateInteger(4,1), game }) );
};

module.exports = Wave1;