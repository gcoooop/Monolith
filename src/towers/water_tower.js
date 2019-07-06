const Tower = require("./tower");
const Droplet = require("../moving_objects/artillery/droplet");

class WaterTower extends Tower {
  constructor(options) {
    options.type = WaterTower.TYPE;
    options.range = WaterTower.RANGE;
    options.damage = WaterTower.DAMAGE;
    options.reload = WaterTower.RELOAD;
    options.artillery = Droplet;
    super(options);
  }

  strikeReport(target, artillery) {
    target.takeDamage(this.damage);
  }
}

WaterTower.TYPE = "water";
WaterTower.RANGE = 300;
WaterTower.DAMAGE = 0.2;
WaterTower.RELOAD = 200;

module.exports = WaterTower;