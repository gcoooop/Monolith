const Artillery = require("./artillery");

class Flame extends Artillery {
  constructor(options) {
    options.dimensions = [ Flame.DIMENSION_X, Flame.DIMENSION_Y ];
    options.speed = Flame.SPEED;
    options.sprite = "flame";
    super(options);

  }
}

Flame.DIMENSION_X = 34;
Flame.DIMENSION_Y = 22;
Flame.SPEED = 3;

module.exports = Flame;