const Tower = require("./tower");

class EarthTower extends Tower {
  constructor(options) {
    options.type = EarthTower.TYPE;
    options.range = EarthTower.RANGE;
    options.damage = EarthTower.DAMAGE;
    options.reload = EarthTower.RELOAD;
    super(options);
  }
}

EarthTower.TYPE = "earth";
EarthTower.RANGE = 400;
EarthTower.DAMAGE = 1;
EarthTower.RELOAD = 1000;

module.exports = EarthTower;