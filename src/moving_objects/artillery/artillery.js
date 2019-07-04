const MovingObject = require("../moving_object");

class Artillery extends MovingObject {
  constructor(options) {
    this.damage = options.damage;
    super(options);
  }
}

module.exports = Artillery;