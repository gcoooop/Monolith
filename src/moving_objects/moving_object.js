class MovingObject {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.hitRadius = options.hitRadius;
    this.game = options.game;
    this.scale = options.scale || 1;
    this.sprite = document.getElementById(options.sprite);
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.theta + Math.PI * 0.5);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.sprite, -this.sprite.width * 0.5, -this.sprite.height * 0.5);
    ctx.restore();
  }

  move(dt) {
    const x = this.pos[0] + this.vel[0] * (dt / normalFrameRate);
    const y = this.pos[1] + this.vel[1] * (dt / normalFrameRate);
    this.pos = [ x, y ];
  }

  remove() {
    this.game.remove(this);
  }

  isOutOfBounds() {
    return this.pos[0] < 0 || this.pos[0] > 1500 || this.pos[1] < 0 || this.pos[1] > 1000;
  }
}

const normalFrameRate = 1000 / 60;

module.exports = MovingObject;