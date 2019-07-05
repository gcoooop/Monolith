const Tower = require("./tower");
const Flame = require("../moving_objects/artillery/flame");

class FireTower extends Tower {
  constructor(options) {
    options.type = FireTower.TYPE;
    options.range = FireTower.RANGE;
    options.damage = FireTower.DAMAGE;
    options.reload = FireTower.RELOAD;
    options.artillery = Flame;
    super(options);
  }
}

FireTower.TYPE = "fire";
FireTower.RANGE = 125;
FireTower.DAMAGE = 5;
FireTower.RELOAD = 4000;

module.exports = FireTower;