const NPC = require("./npc");

class Mammoth extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "mammoth";
    super(options);
  }
}

module.exports = Mammoth;