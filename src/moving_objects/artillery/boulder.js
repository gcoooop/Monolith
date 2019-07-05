const Artillery = require("./artillery");

class Boulder extends Artillery {
  constructor(options) {
    options.dimensions = [ Boulder.DIMENSION_X, Boulder.DIMENSION_Y ];
    options.speed = Boulder.SPEED;
    options.sprite = "boulder"
    super(options);
  }

  move(dt) {
    if (this.isAtTargetLocation() || this.isOutOfBounds() || this.beyondTowerRange()) this.explode();
    this.calculateVelocity();
    super.move(dt)
  }
}

Boulder.DIMENSION_X = 34;
Boulder.DIMENSION_Y = 22;
Boulder.SPEED = 7;

module.exports = Boulder;