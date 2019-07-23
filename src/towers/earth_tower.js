const Tower = require("./tower");
const Boulder = require("../moving_objects/artillery/boulder");

class EarthTower extends Tower {
  constructor(options) {
    options.type = EarthTower.TYPE;
    options.range = EarthTower.RANGE;
    options.damage = EarthTower.DAMAGE;
    options.reload = EarthTower.RELOAD;
    options.flint = EarthTower.FLINT;
    options.sprite = EarthTower.SPRITE;
    options.artillery = Boulder;
    super(options);
    EarthTower.FLINT += 20;
  }

  strikeReport(target, artillery) {
    this.allTargets().forEach(target => {
      if (this.inAOE(target, artillery)) {
        target.takeDamage(this.damage);
      }
    });
  }

  inAOE(target, artillery) {
    const minDist = target.hitRadius + artillery.hitRadius;
    const dx = target.pos[0] - artillery.pos[0];
    const dy = target.pos[1] - artillery.pos[1];
    const actualDist = Math.sqrt(dx**2 + dy**2);
    return actualDist < minDist;
  }
}

EarthTower.TYPE = "earth";
EarthTower.RANGE = 225;
EarthTower.DAMAGE = 1;
EarthTower.RELOAD = 750;
EarthTower.FLINT = 100;
EarthTower.SPRITE = document.getElementById("earth-tower");

module.exports = EarthTower;