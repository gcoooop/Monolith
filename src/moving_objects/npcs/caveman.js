const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "caveman";
    super(options);
  }
}

module.exports = Caveman;