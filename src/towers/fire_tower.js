const Tower = require("./tower");

class FireTower extends Tower {
  constructor(options) {
    options.type = "fire";
    options.range = 50;
    options.damage = 5;
    options.reload = 4000;
    super(options);
  }
}

module.exports = FireTower;