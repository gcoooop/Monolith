const Artillery = require("./artillery");

class Boulder extends Artillery {
  constructor(options) {
    options.speed = Boulder.SPEED;
    options.scale = Boulder.SCALE;
    options.sprite = "boulder"
    super(options);
  }
}

Boulder.SPEED = 7;
Boulder.SCALE = 1.25;

module.exports = Boulder;