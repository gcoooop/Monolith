const MovingObject = require("../moving_object");
const Path = require("../../pathing/path");
const Util = require("../../util/util");

class NPC extends MovingObject {
  constructor(options) {
    super(options);
    this.id = options.id;
    this.fullHealth = options.health;
    this.health = options.health;
    this.damage = options.damage;
    this.flint = options.flint;
    this.speed = options.speed;
    this.path = new Path(options.path);
    this.pos = this.path.dequeue();
    this.dest = this.path.dequeue();
    this.throttledDealDamage = Util.throttle(this.dealDamage.bind(this), 1000);
    this.followPath();
  }
  
  draw(ctx) {
    super.draw(ctx);
    const x0Health = this.pos[0] - this.sprite.width * 0.5;
    const y = this.pos[1] - this.sprite.height * 0.5;
    const x100Health = this.pos[0] + this.sprite.width * 0.5;
    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;

    const healthPercentage = this.health / this.fullHealth * 100;
    let healthColor;
    switch (true) {
      case healthPercentage >= 80:
        healthColor = "#00FF00";
        break;
      case healthPercentage < 80 && healthPercentage >= 60:
        healthColor = "#96FF02";
        break;
      case healthPercentage < 60 && healthPercentage >= 40:
        healthColor = "#FFFF00";
        break;
      case healthPercentage < 40 && healthPercentage >= 20:
        healthColor = "#FF7F00";
        break;
      case healthPercentage < 20:
        healthColor = "#FF0000";
        break;
    }

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
    ctx.strokeStyle = healthColor;
    ctx.stroke();
  }

  move(dt) {
    if (this.dest) {
      if (this.isAtDest()) this.updateDest();
    } else {
      this.throttledDealDamage(this.damage);
    }
    super.move(dt)
  }
  
  followPath() {
    const dx = this.pos[0] - this.dest[0];
    const dy = this.pos[1] - this.dest[1];
    let theta = Math.atan( dy / dx );
    if (dx > 0 && dy > 0) {
      theta += Math.PI;
    } else if (dx > 0 && dy < 0) {
      theta -= Math.PI;
    }
    this.theta = theta;
    this.vel = [ this.speed * Math.cos(theta), this.speed * Math.sin(theta)];
  }
  
  isAtDest() {
    const dx = this.pos[0] - this.dest[0];
    const dy = this.pos[1] - this.dest[1];
    return (dx > -2 && dx < 2) && (dy > -2 && dy < 2);
  }

  updateDest() {
    if (this.path.pointCount()) {
      this.dest = this.path.dequeue();
      this.followPath();
    } else {
      this.dest = null;
      this.vel = [0, 0];
    }
  }
  
  takeDamage(artilleryDamage) {
    this.health -= artilleryDamage;
    if (!this.hasHealth()) this.sendToHospital();
  }

  dealDamage() {
    this.game.damageMonolith(this.damage);
  }
  
  hasHealth() {
    return this.health > 0;
  }
  
  sendToHospital() {
    this.remove();
  }
}

module.exports = NPC;