const MovingObject = require("../moving_object");

class Artillery extends MovingObject {
  constructor(options) {
    super(options);
    this.tower = options.tower;
    this.damage = options.tower.damage;
  }
}

module.exports = Artillery;