const Tower = require("./tower");

class FireTower extends Tower {
  constructor(options) {
    options.type = FireTower.TYPE;
    options.range = FireTower.RANGE;
    options.damage = FireTower.DAMAGE;
    options.reload = FireTower.RELOAD;
    super(options);
  }
}

FireTower.TYPE = "fire";
FireTower.RANGE = 250;
FireTower.DAMAGE = 5;
FireTower.RELOAD = 4000;

module.exports = FireTower;