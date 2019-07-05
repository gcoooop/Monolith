const NPC = require("./npc");

class Mammoth extends NPC {
  constructor(options) {
    options.dimensions = [ Caveman.DIMENSION_X, Caveman.DIMENSION_Y ];
    options.speed = Mammoth.SPEED;
    options.sprite = "mammoth";
    super(options);
  }
}

Mammoth.DIMENSION_X = 32;
Mammoth.DIMENSION_Y = 50;
Mammoth.SPEED = Math.sqrt(2);

module.exports = Mammoth;