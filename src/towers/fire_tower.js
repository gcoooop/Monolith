const Tower = require("./tower");
const Flame = require("../moving_objects/artillery/flame");
const Util = require("../util/util");
const fireTowerImg = document.getElementById("fire-tower");

class FireTower extends Tower {
  constructor(options) {
    options.type = FireTower.TYPE;
    options.range = FireTower.RANGE;
    options.damage = FireTower.DAMAGE;
    options.reload = FireTower.RELOAD;
    options.flint = FireTower.FLINT;
    options.artillery = Flame;
    super(options);
    this.sprite = fireTowerImg;
    this.throttledStrikeReport = Util.throttle(this.strikeReport.bind(this), 100);
    FireTower.FLINT += 20;
  }

  fire() {
    this.createFlames();
  }

  createFlames() {
    const amtFlames = 40;
    for (let n = 0; n < amtFlames; n++) {
      const theta = 2 * Math.PI * (n / amtFlames);
      const vel = [Flame.SPEED * Math.cos(theta), Flame.SPEED * Math.sin(theta)];
      const artillery = new this.artillery({ vel, tower: this, game: this.game });
      this.game.add(artillery);
    }
  }

  strikeReport() {
    this.allTargets().forEach(target => {
      target.takeDamage(this.damage);
    });
  }
}

FireTower.TYPE = "fire";
FireTower.RANGE = 175;
FireTower.DAMAGE = 5;
FireTower.RELOAD = 4000;
FireTower.FLINT = 100;

module.exports = FireTower;