const MovingObject = require("../moving_object");
const Path = require("../../pathing/path");

class NPC extends MovingObject {
  constructor(options) {
    super(options);
    this.health = options.health;
    this.damage = options.damage;
    this.speed = options.speed;
    this.path = new Path(options.path);
    this.pos = this.path.points[0];
    this.followPath();
  }

  followPath() {
    const { points } = this.path;
    const theta = Math.atan( (points[0][1] - points[1][1]) / (points[0][0] - points[1][0]) );
    this.vel = [ this.speed * Math.cos(theta), this.speed * Math.sin(theta)];
    console.log(this.speed);
  }
}

module.exports = NPC;