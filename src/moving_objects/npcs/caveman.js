const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.speed = Math.sqrt(2);
    options.sprite = "caveman";
    super(options);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - Caveman.DIMENSION_X * 0.5, this.pos[1] - Caveman.DIMENSION_Y * 0.5);
  }
}

Caveman.DIMENSION_X = 25;
Caveman.DIMENSION_Y = 25;

module.exports = Caveman;