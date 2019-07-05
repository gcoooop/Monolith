const MovingObject = require("../moving_object");
const Path = require("../../pathing/path");

class NPC extends MovingObject {
  constructor(options) {
    super(options);
    this.fullHealth = options.health;
    this.health = options.health;
    this.damage = options.damage;
    this.speed = options.speed;
    this.path = new Path(options.path);
    this.pos = this.path.dequeue();
    this.dest = this.path.dequeue();
    this.followPath();
  }
  
  draw(ctx) {
    super.draw(ctx);
    const x0Health = this.pos[0] - this.dimensions[0] * 0.5;
    const y = this.pos[1] - this.dimensions[1] * 0.5;
    const x100Health = this.pos[0] + this.dimensions[0] * 0.5;
    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;

    ctx.beginPath();
    ctx.moveTo(x0Health, y);
    ctx.lineTo(x100Health, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x0Health, y);
    ctx.lineTo(xNHealth, y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.stroke();
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
  
  takeDamage(artilleryDamage) {
    this.health -= artilleryDamage;
  }
  
  hasHealth() {
    return this.health > 0;
  }
  
  sendToHospital() {
    this.remove();
  }
}

module.exports = NPC;