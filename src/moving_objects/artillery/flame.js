const Artillery = require("./artillery");

class Flame extends Artillery {
  constructor(options) {
    options.speed = Flame.SPEED;
    // does not need a hitRadius because AOE is determined by the range of the tower
    options.sprite = "flame";
    super(options);
    this.vel = options.vel;
  }

  explode() {
    this.tower.throttledStrikeReport();
    this.remove();
  }

  calculateVelocity(theta) {
    // 
  }

  calcTargetLocation() {
    // do nothing
  }
}


Flame.SPEED = 10;

module.exports = Flame;