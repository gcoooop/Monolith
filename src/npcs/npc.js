const MovingObject = require("../moving_object");

class NPC extends MovingObject {
  constructor(options) {
    super(options);
    this.health = options.health;
    this.damage = options.damage;
  }
}

module.exports = NPC;