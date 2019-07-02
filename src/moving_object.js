class MovingObject {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.hitRadius = options.hitRadius;
    this.game = options.game;
    this.sprite = document.getElementById(options.sprite);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0], this.pos[1]);
  }

  move(dt) {
    this.pos = [
      this.pos[0] + this.vel[0] * dt,
      this.pos[1] + this.vel[1] * dt
    ];
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;