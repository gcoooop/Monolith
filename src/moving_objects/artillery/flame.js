const Artillery = require("./artillery");

class Flame extends Artillery {
  constructor(options) {
    options.dimensions = [ Flame.DIMENSION_X, Flame.DIMENSION_Y ];
    options.speed = Flame.SPEED;
    options.sprite = "flame";
    super(options);
    this.vel = options.vel;
  }

  move(dt) {
    if (this.isOutOfBounds() || this.beyondTowerRange()) this.explode();
    this.calculateVelocity();
    super.move(dt)
  }

  calculateVelocity(theta) {
    // 
  }

  calcTargetLocation() {
    // do nothing
  }
}

Flame.DIMENSION_X = 34;
Flame.DIMENSION_Y = 22;
Flame.SPEED = 10;

module.exports = Flame;