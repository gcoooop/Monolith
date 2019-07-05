const MovingObject = require("../moving_object");

class Artillery extends MovingObject {
  constructor(options) {
    options.hitRadius = 4;
    super(options);
    this.game = options.game;
    this.tower = options.tower;
    this.pos = options.tower.pos;
    this.speed = options.speed;
    this.target = options.target
    this.calcTargetLocation();
    this.calculateVelocity();
  }

  move(dt) {
    if (this.isAtTargetLocation() || this.isOutOfBounds() || this.beyondTowerRange()) this.explode();
    this.calculateVelocity();
    super.move(dt)
  }

  explode() {
    this.tower.strikeReport(this.target, this);
    this.remove();
  }

  calcTargetLocation() {
    this.targetLocation = this.target.pos;
  }

  calculateVelocity() {
    this.calcTargetLocation();
    const dx = this.pos[0] - this.targetLocation[0];
    const dy = this.pos[1] - this.targetLocation[1];
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
    return dx >= -4 && dx <= 4 && dy >= -4 && dy <= 4;
  }

  beyondTowerRange() {
    const dx = this.tower.pos[0] - this.pos[0];
    const dy = this.tower.pos[1] - this.pos[1];
    const d = Math.sqrt(dx**2 + dy**2);
    return d > this.tower.range;
  }
}

module.exports = Artillery;