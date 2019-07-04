const NPC = require("./npc");

class Eagle extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "eagle";
    super(options);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - Eagle.DIMENSION_X * 0.5, this.pos[1] - Eagle.DIMENSION_Y  * 0.5);
  }
}

Eagle.DIMENSION_X = 50;
Eagle.DIMENSION_Y = 19;

module.exports = Eagle;