const Tower = require("./tower");
const Droplet = require("../moving_objects/artillery/droplet");

class WaterTower extends Tower {
  constructor(options) {
    options.type = WaterTower.TYPE;
    options.range = WaterTower.RANGE;
    options.damage = WaterTower.DAMAGE;
    options.reload = WaterTower.RELOAD;
    options.flint = WaterTower.FLINT;
    options.sprite = WaterTower.SPRITE;
    options.artillery = Droplet;
    super(options);
    WaterTower.FLINT += 20;
  }

  strikeReport(target, artillery) {
    target.takeDamage(this.damage);
  }
}

WaterTower.TYPE = "water";
WaterTower.RANGE = 350;
WaterTower.DAMAGE = 0.2;
WaterTower.RELOAD = 200;
WaterTower.FLINT = 100;
WaterTower.SPRITE = document.getElementById("water-tower");

module.exports = WaterTower;