const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.velocity = 5;
    options.sprite = "caveman";
    super(options);
  }
}

module.exports = Caveman;