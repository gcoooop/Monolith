const NPC = require("./npc");

class Eagle extends NPC {
  constructor(options) {
    options.vel = [0.5, 0.5];
    options.sprite = "eagle";
    super(options);
  }
}

module.exports = Eagle;