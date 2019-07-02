class MovingObject {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.sprite = options.sprite;
    this.hitRadius = options.hitRadius;
    this.game = options.game;
  }

  draw(ctx) {

  }
}