const MovingObject = require("../moving_object");

class Artillery extends MovingObject {
  constructor(options) {
    super(options);
    this.game = options.game;
    this.tower = options.tower;
    this.pos = options.tower.pos;
    this.speed = options.speed;
    this.damage = options.tower.damage;
    this.targetLocation = options.targetLocation;
    this.calculateVelocity();
  }

  move(dt) {
    if (this.isAtTargetLocation() || this.isOutOfBounds()) this.explode();
    super.move(dt)
  }

  explode() {
    this.game.remove(this);
  }

  calculateVelocity() {
    const dx = this.pos[0] - this.targetLocation[0];
    const dy = this.pos[1] - this.targetLocation[1];
    console.log(dx, dy);
    let theta = Math.atan(dy / dx);
    if (dx > 0 && dy > 0) {
      theta += Math.PI;
    } else if (dx > 0 && dy < 0) {
      theta -= Math.PI;
    }
    this.vel = [this.speed * Math.cos(theta), this.speed * Math.sin(theta)];
  }

  isAtTargetLocation() {
    const dx = Math.floor(this.pos[0] - this.targetLocation[0]);
    const dy = Math.floor(this.pos[1] - this.targetLocation[1]);
    return dx === 0 || dy === 0;
  }
}

module.exports = Artillery;