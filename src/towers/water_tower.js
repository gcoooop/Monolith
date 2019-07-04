const Tower = require("./tower");

class WaterTower extends Tower {
  constructor(options) {
    options.type = WaterTower.TYPE;
    options.range = WaterTower.RANGE;
    options.damage = WaterTower.DAMAGE;
    options.reload = WaterTower.RELOAD;
    super(options);
  }
}

WaterTower.TYPE = "water";
WaterTower.RANGE = 300;
WaterTower.DAMAGE = 0.2;
WaterTower.RELOAD = 20;

module.exports = WaterTower;