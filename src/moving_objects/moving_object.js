class MovingObject {
  constructor(options = {}) {
    this.dimensions = options.dimensions;
    this.pos = options.pos;
    this.vel = options.vel;
    this.hitRadius = options.hitRadius;
    this.game = options.game;
    this.sprite = document.getElementById(options.sprite);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - this.dimensions[0] * 0.5, this.pos[1] - this.dimensions[1] * 0.5);
  }

  move(dt) {
    const x = this.pos[0] + this.vel[0] * (dt / normalFrameRate);
    const y = this.pos[1] + this.vel[1] * (dt / normalFrameRate);
    this.pos = [ x, y ];
  }

  remove() {
    this.game.remove(this);
  }
}

const normalFrameRate = 1000 / 60;

module.exports = MovingObject;