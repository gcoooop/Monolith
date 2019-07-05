const NPC = require("./npc");

class Spider extends NPC {
  constructor(options) {
    options.dimensions = [ Caveman.DIMENSION_X, Caveman.DIMENSION_Y ];
    options.speed = Spider.SPEED;
    options.sprite = "spider";
    super(options);
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos[0] - Spider.DIMENSION_X  * 0.5, this.pos[1] - Spider.DIMENSION_Y  * 0.5);
  }
}

Spider.DIMENSION_X = 37;
Spider.DIMENSION_Y = 50;
Spider.SPEED = Math.sqrt(2);

module.exports = Spider;