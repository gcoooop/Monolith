const Artillery = require("./artillery");

class Droplet extends Artillery {
  constructor(options) {
    options.dimensions = [ Droplet.DIMENSION_X, Droplet.DIMENSION_Y ];
    options.speed = Droplet.SPEED;
    options.sprite = "droplet";
    super(options);

  }
}

Droplet.DIMENSION_X = 34;
Droplet.DIMENSION_Y = 22;
Droplet.SPEED = 3;

module.exports = Droplet;