const Artillery = require("./artillery");

class Boulder extends Artillery {
  constructor(options) {
    options.dimensions = [ Boulder.DIMENSION_X, Boulder.DIMENSION_Y ];
    options.speed = Boulder.SPEED;
    options.sprite = "boulder"
    super(options);

  }
}

Boulder.DIMENSION_X = 34;
Boulder.DIMENSION_Y = 22;
Boulder.SPEED = 3;

module.exports = Boulder;