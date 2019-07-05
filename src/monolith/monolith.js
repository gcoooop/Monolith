class Monolith {
  constructor() {
    this.pos = Monolith.POS;
    this.health = Monolith.HEALTH;
  }

  draw(ctx) {
    const width = 50;
    const height = 100;
    const topLeftX = this.pos[0] - (0.5 * width);
    const topLeftY = this.pos[1] - (0.5 * height);
    ctx.beginPath();
    ctx.fillRect(topLeftX, topLeftY, width, height);
    ctx.fillStyle = "#201e23"
    ctx.stroke()
  }
}

Monolith.POS = [1200, 215];
Monolith.HEALTH = 100;

module.exports = Monolith;