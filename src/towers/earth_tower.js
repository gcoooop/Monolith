const Tower = require("./tower");
const Boulder = require("../moving_objects/artillery/boulder");

class EarthTower extends Tower {
  constructor(options) {
    options.type = EarthTower.TYPE;
    options.range = EarthTower.RANGE;
    options.damage = EarthTower.DAMAGE;
    options.reload = EarthTower.RELOAD;
    options.artillery = Boulder;
    super(options);
  }
}

EarthTower.TYPE = "earth";
EarthTower.RANGE = 200;
EarthTower.DAMAGE = 1;
EarthTower.RELOAD = 1000;

module.exports = EarthTower;