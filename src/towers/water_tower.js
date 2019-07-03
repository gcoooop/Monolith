const Tower = require("./tower");

class WaterTower extends Tower {
  constructor(options) {
    options.type = "water";
    options.range = 300;
    options.damage = 0.2;
    options.reload = 20;
    super(options);
  }
}

module.exports = WaterTower;