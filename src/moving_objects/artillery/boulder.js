const Artillery = require("./artillery");

class Boulder extends Artillery {
  constructor(options) {
    options.speed = Boulder.SPEED;
    options.hitRadius = Boulder.HIT_RADIUS;
    options.scale = Boulder.SCALE;
    options.sprite = "boulder"
    super(options);
  }
}

Boulder.SPEED = 7;
Boulder.HIT_RADIUS = 12;
Boulder.SCALE = 1.25;

module.exports = Boulder;