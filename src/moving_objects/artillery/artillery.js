const MovingObject = require("../moving_object");

class Artillery extends MovingObject {
  constructor(options) {
    super(options);
    this.game = options.game;
    this.tower = options.tower;
    this.pos = options.tower.pos;
    this.speed = options.speed;
    this.target = options.target
    this.calculateVelocity();
  }

  move(dt) {
    if (this.isAtTargetLocation() || this.isOutOfBounds() || this.beyondTowerRange()) {
      this.explode();
    } else {
      this.calculateVelocity();
      super.move(dt)
    }
  }

  explode() {
    // not checking if the target has health before issuing a strike report leads to an interesting bug
    // in the instance where a strike report was issued causing an NPC to be sent to the hospital,
    // the game will remove the NPC as soon as the fatal damage is dealt.
    // however, the water tower, since its fire rate is very quick, still has artillery in motion
    // targeting the already removed target. in this case, if a strike report is issued on an already removed NPC,
    // the game will remove the next NPC on the towers target list regardless of their health 
    // this.tower.strikeReport(this.target, this);
    if (this.target.hasHealth()) this.tower.strikeReport(this.target, this);
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
    this.theta = theta;
    this.vel = [this.speed * Math.cos(theta), this.speed * Math.sin(theta)];
  }

  isAtTargetLocation() {
    if (!this.targetLocation) return null;
    const dx = Math.floor(this.pos[0] - this.targetLocation[0]);
    const dy = Math.floor(this.pos[1] - this.targetLocation[1]);
    return dx >= -5 && dx <= 5 && dy >= -5 && dy <= 5;
  }

  beyondTowerRange() {
    const dx = this.tower.pos[0] - this.pos[0];
    const dy = this.tower.pos[1] - this.pos[1];
    const d = Math.sqrt(dx**2 + dy**2);
    return d > this.tower.range;
  }
}

module.exports = Artillery;