const NPC = require("./npc");

class Mammoth extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "mammoth";
    super(options);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - Mammoth.DIMENSION_X * 0.5, this.pos[1] - Mammoth.DIMENSION_Y  * 0.5);
  }
}

Mammoth.DIMENSION_X = 32;
Mammoth.DIMENSION_Y = 50;

module.exports = Mammoth;