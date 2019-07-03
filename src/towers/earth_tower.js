const Tower = require("./tower");

class EarthTower extends Tower {
  constructor(options) {
    options.type = "earth";
    options.range = 200;
    options.damage = 1;
    options.reload = 1000;
    super(options);
  }
}

module.exports = EarthTower;