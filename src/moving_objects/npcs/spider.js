const NPC = require("./npc");

class Spider extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "spider";
    super(options);
  }
}

module.exports = Spider;