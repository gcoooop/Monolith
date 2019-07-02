const MovingObject = require("./moving_object");

class NPC extends MovingObject {
  constructor(options) {
    this.health = options.health;
    this.damage = options.damage;
    super(options);
  }
}

module.exports = NPC;