const MovingObject = require("../moving_object");
const Path = require("../../pathing/path");

class NPC extends MovingObject {
  constructor(options) {
    super(options);
    this.health = options.health;
    this.damage = options.damage;
    this.speed = options.speed;
    this.path = new Path(options.path);
    this.pos = this.path.dequeue();
    this.dest = this.path.dequeue();
    this.followPath();
  }
  
  move(dt) {
    if (this.isAtDest()) this.updateDest();
    super.move(dt)
  }
  
  followPath() {
    const dx = this.pos[0] - this.dest[0];
    const dy = this.pos[1] - this.dest[1];
    let theta = Math.atan( dy / dx );
    if (dx > 0 && dy > 0) {
      theta += Math.PI;
    }
    this.vel = [ this.speed * Math.cos(theta), this.speed * Math.sin(theta)];
  }
  
  isAtDest() {
    const dx = Math.floor(this.pos[0] - this.dest[0]);
    const dy = Math.floor(this.pos[1] - this.dest[1]);
    return dx === 0 || dy === 0;
  }

  updateDest() {
    if (this.path.pointCount()) {
      this.dest = this.path.dequeue();
      this.followPath();
    } else {
      this.vel = [0, 0];
    }
  }
}

module.exports = NPC;