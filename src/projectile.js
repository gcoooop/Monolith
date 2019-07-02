const MovingObject = require("./moving_object");

class Projectile extends MovingObject {
  constructor(options) {
    this.damage = options.damage;
    super(options);
  }
}

module.exports = Projectile;