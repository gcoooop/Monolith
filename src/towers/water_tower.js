const Tower = require("./tower");
const Droplet = require("../moving_objects/artillery/droplet");
const waterTowerImg = document.getElementById("water-tower");

class WaterTower extends Tower {
  constructor(options) {
    options.type = WaterTower.TYPE;
    options.range = WaterTower.RANGE;
    options.damage = WaterTower.DAMAGE;
    options.reload = WaterTower.RELOAD;
    options.flint = WaterTower.FLINT;
    options.artillery = Droplet;
    super(options);
    this.sprite = waterTowerImg;
    WaterTower.FLINT += 20;
  }

  strikeReport(target, _) {
    target.takeDamage(this.damage);
  }
}

WaterTower.TYPE = "water";
WaterTower.RANGE = 350;
WaterTower.DAMAGE = 0.2;
WaterTower.RELOAD = 200;
WaterTower.FLINT = 100;

module.exports = WaterTower;