const NPC = require("./npc");

class Spider extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "spider";
    super(options);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - Spider.DIMENSION_X  * 0.5, this.pos[1] - Spider.DIMENSION_Y  * 0.5);
  }
}

Spider.DIMENSION_X = 37;
Spider.DIMENSION_Y = 50;

module.exports = Spider;