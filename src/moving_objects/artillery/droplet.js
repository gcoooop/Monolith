const Artillery = require("./artillery");

class Droplet extends Artillery {
  constructor(options) {
    options.speed = Droplet.SPEED;
    options.scale = Droplet.SCALE;
    options.sprite = "droplet";
    super(options);
  }
}

Droplet.SPEED = 10;
Droplet.SCALE = 0.75;

module.exports = Droplet;