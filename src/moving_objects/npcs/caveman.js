const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.speed = Math.sqrt(2);
    options.sprite = "caveman";
    super(options);
  }
}

module.exports = Caveman;